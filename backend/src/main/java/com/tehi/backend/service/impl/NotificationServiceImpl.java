package com.tehi.backend.service.impl;

import com.tehi.backend.service.NotificationService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class NotificationServiceImpl implements NotificationService {

    private final FirebasePushService firebasePushService;

    public NotificationServiceImpl(FirebasePushService firebasePushService) {
        this.firebasePushService = firebasePushService;
    }

    @Value("${twilio.account-sid:}")
    private String accountSid;

    @Value("${twilio.auth-token:}")
    private String authToken;

    @Value("${twilio.from-phone:}")
    private String fromPhone;

    @Override
    public void sendPush(String deviceToken, String title, String body) {
        firebasePushService.sendPush(deviceToken, title, body);
    }

    @Override
    public void sendSms(String toPhoneNumber, String message) {
        if (accountSid.isBlank() || authToken.isBlank() || fromPhone.isBlank()) {
            log.warn("Twilio credentials missing; SMS not sent to {}", toPhoneNumber);
            return;
        }

        Twilio.init(accountSid, authToken);
        Message.creator(new PhoneNumber(toPhoneNumber), new PhoneNumber(fromPhone), message).create();
    }
}
