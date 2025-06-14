package com.pickgo.global.exception;

import static com.pickgo.global.response.RsCode.*;

import com.pickgo.global.logging.dto.LogContext;
import com.pickgo.global.logging.util.LogContextUtil;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingRequestCookieException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.async.AsyncRequestNotUsableException;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;

import com.pickgo.domain.log.enums.ActionType;
import com.pickgo.global.logging.util.LogWriter;
import com.pickgo.global.response.RsData;

import jakarta.persistence.OptimisticLockException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalExceptionHandler {

    private static final String EXCEPTION_FORMAT = "[EXCEPTION]                   -----> ";
    private static final String EXCEPTION_MESSAGE_FORMAT = "[EXCEPTION] EXCEPTION_MESSAGE -----> [{}]";
    private static final String EXCEPTION_TYPE_FORMAT = "[EXCEPTION] EXCEPTION_TYPE    -----> [{}]";
    private final LogWriter logWriter;
    private final LogContextUtil logContextUtil;

    @ExceptionHandler(Exception.class)
    public RsData<?> handleAllExceptions(Exception e) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                e,
                ActionType.EXCEPTION,
                logContext
        );
        logError(e);
        return RsData.from(INTERNAL_SERVER);
    }

    @ExceptionHandler(BusinessException.class)
    public RsData<?> handleBusinessException(
        final BusinessException exception
    ) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        return RsData.from(exception.getRsCode());
    }

    @ExceptionHandler(AsyncRequestNotUsableException.class)
    public void handleAsyncTimeout(AsyncRequestNotUsableException exception) {
        logWarn(exception);
    }

    @ExceptionHandler(AsyncRequestTimeoutException.class)
    public void handleAsyncTimeout(AsyncRequestTimeoutException exception) {
        logWarn(exception);
    }

    @ExceptionHandler(MissingRequestCookieException.class)
    public RsData<?> handleMissingRequestCookieException(MissingRequestCookieException exception) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        logWarn(exception);
        return RsData.from(UNAUTHENTICATED);
    }

    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public RsData<?> handleMissingServletRequestParameterException(HttpRequestMethodNotSupportedException exception) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        logWarn(exception);
        return RsData.from(BAD_REQUEST);
    }

    @ExceptionHandler(MissingServletRequestParameterException.class)
    public RsData<?> handleMissingServletRequestParameterException(MissingServletRequestParameterException exception) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        logWarn(exception);
        return RsData.from(BAD_REQUEST);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public RsData<?> handleIllegalArgumentException(
        final IllegalArgumentException exception
    ) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        logWarn(exception);
        return RsData.from(BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public RsData<?> handleMethodArgumentNotValidException(
        final MethodArgumentNotValidException exception
    ) {
        LogContext logContext = logContextUtil.extract();
        logWriter.writeExceptionLog(
                exception,
                ActionType.EXCEPTION,
                logContext
        );
        logWarn(exception);
        return RsData.from(BAD_REQUEST);
    }

    @ExceptionHandler(OptimisticLockException.class)
    public RsData<?> handleOptimisticLockException() {

        return RsData.from(SEAT_CONFLICT);
    }

    private void logError(Exception e) {
        log.error(EXCEPTION_TYPE_FORMAT, e.getClass().getSimpleName());
        log.error(EXCEPTION_MESSAGE_FORMAT, e.getMessage());
        log.error(EXCEPTION_FORMAT, e);
    }

    private void logWarn(Exception e) {
        log.warn(EXCEPTION_TYPE_FORMAT, e.getClass().getSimpleName());
        log.warn(EXCEPTION_MESSAGE_FORMAT, e.getMessage());
    }
}