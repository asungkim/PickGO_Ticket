package com.pickgo.domain.queue.stream;

import com.pickgo.domain.auth.token.service.TokenService;
import com.pickgo.domain.queue.dto.EntryPermission;
import com.pickgo.domain.queue.dto.QueueSession;
import com.pickgo.domain.queue.dto.WaitingState;
import com.pickgo.global.config.thread.ExecutorConfig;
import com.pickgo.global.infra.sse.SseHandler;
import com.pickgo.global.infra.stream.redis.RedisStreamConsumer;
import com.pickgo.global.init.ServerIdProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.env.Environment;
import org.springframework.data.redis.connection.stream.MapRecord;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.concurrent.Executor;

/**
 * 대기열 Stream Consumer
 */
@Slf4j
@Component
public class QueueStreamConsumer extends RedisStreamConsumer {

    private static final String QUEUE_CONSUMER_GROUP_NAME = "queue_consumer_group"; // 대기열 Consumer Group 이름
    public static final String QUEUE_STREAM_PREFIX = "queue_stream"; // 대기열 Stream
    private final ServerIdProvider serverIdProvider;
    private final SseHandler sseHandler;
    private final ExecutorConfig executorConfig;
    private final TokenService tokenService;

    public QueueStreamConsumer(StringRedisTemplate redisTemplate,
                               ServerIdProvider serverIdProvider,
                               SseHandler sseHandler,
                               ExecutorConfig executorConfig,
                               Environment environment,
                               TokenService tokenService
    ) {
        super(redisTemplate, environment);
        this.serverIdProvider = serverIdProvider;
        this.sseHandler = sseHandler;
        this.executorConfig = executorConfig;
        this.tokenService = tokenService;
    }

    @Override
    protected String getConsumerGroupName() {
        return QUEUE_CONSUMER_GROUP_NAME;
    }

    @Override
    protected String getConsumerName() {
        return serverIdProvider.getServerId();
    }

    @Override
    protected String getStreamKey() {
        String serverId = serverIdProvider.getServerId();
        return QUEUE_STREAM_PREFIX + ":server_id:" + serverId;
    }

    @Override
    protected Executor getExecutor() {
        return executorConfig.queueThreadPoolTaskExecutor();
    }

    /**
     * 메시지 처리 (클라이언트에게 메시지 전송)
     */
    @Override
    protected void handleMessage(MapRecord<String, Object, Object> message) throws IOException {
        var values = message.getValue();

        String type = values.get("type").toString();
        String connectionId = values.get("connection_id").toString();

        switch (type) {
            case "ready" -> { // 대기 완료, 입장 준비됨
                // 입장 토큰 발행
                QueueSession session = sseHandler.getSession(connectionId, QueueSession.class);
                String entryToken = tokenService.genEntryToken(session.getPerformanceSessionId(), session.getUserId());

                // 메시지 전송, SSE 연결 해제
                sseHandler.sendMessage(type, connectionId, EntryPermission.of(entryToken));
                sseHandler.complete(connectionId);
            }
            case "wait" -> { // 대기열 상태
                int position = Integer.parseInt(values.get("position").toString());
                int totalCount = Integer.parseInt(values.get("total_count").toString());
                String estimatedTime = values.get("estimated_time").toString();
                sseHandler.sendMessage(type, connectionId, WaitingState.of(position, totalCount, estimatedTime));
            }
            default -> log.warn("Unknown message type: {}", type);
        }
    }
}

