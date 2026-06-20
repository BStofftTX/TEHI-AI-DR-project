package com.tehi.backend.service;

public interface NotificationService {
    void sendPush(String deviceToken, String title, String body);
    void sendSms(String toPhoneNumber, String message);
}
