package com.tehi.backend.service.impl;

import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class FirebasePushService {

    public void sendPush(String deviceToken, String title, String body) {
        try {
            Message message = Message.builder()
                .setToken(deviceToken)
                .putData("title", title)
                .putData("body", body)
                .build();
            FirebaseMessaging.getInstance().send(message);
        } catch (Exception ex) {
            log.warn("Firebase push skipped or failed: {}", ex.getMessage());
        }
    }
}
