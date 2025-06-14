package com.pickgo.domain.auth.auth.controller;

import static com.pickgo.global.response.RsCode.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.Duration;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.pickgo.domain.auth.token.repository.redis.RedisRefreshTokenRepository;
import com.pickgo.domain.log.repository.MemberHistoryRepository;
import com.pickgo.domain.member.member.entity.Member;
import com.pickgo.domain.member.member.entity.enums.Authority;
import com.pickgo.domain.member.member.entity.enums.SocialProvider;
import com.pickgo.domain.member.member.repository.MemberRepository;
import com.pickgo.global.jwt.JwtProvider;
import com.pickgo.global.logging.service.HistorySaveService;
import com.pickgo.global.token.TestToken;

import jakarta.servlet.http.Cookie;


@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class TokenControllerTest {

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	private HistorySaveService historySaveService;

	@Autowired
	private MemberHistoryRepository memberHistoryRepository;

	@Autowired
	private RedisRefreshTokenRepository redisRefreshTokenRepository;

	@Autowired
	private TestToken token;

	// 회원가입된 기존 유저
	private final String testEmail = "test@example.com";
	private final String testPassword = "test_password";
	private final String testNickname = "test_user";

	private Member getTestMember() {
		return Member.builder()
			.id(jwtProvider.getUserId(token.userToken))
			.email(testEmail)
			.password(testPassword)
			.nickname(testNickname)
			.authority(Authority.USER)
			.socialProvider(SocialProvider.NONE)
			.build();
	}

	@BeforeEach
	void setUp() {
		Member member = getTestMember();
		memberRepository.save(member);
	}

	@AfterEach
	void tearDown() {
		memberRepository.deleteAll();
	}

	@Test
	@DisplayName("refreshToken 쿠키로 accessToken 발급 성공")
	void createToken_성공() throws Exception {
		Member member = getTestMember();
		redisRefreshTokenRepository.save(member.getId(), token.userToken, Duration.ofMinutes(86400));

		mockMvc.perform(post("/api/tokens")
				.cookie(new Cookie("refreshToken", token.userToken))
				.contentType(MediaType.APPLICATION_JSON))
			.andExpect(status().isCreated())
			.andExpect(jsonPath("$.code").value(CREATED.getCode()))
			.andExpect(jsonPath("$.data.accessToken").exists());
	}
}
