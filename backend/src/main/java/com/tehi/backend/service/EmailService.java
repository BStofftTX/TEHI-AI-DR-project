package com.tehi.backend.service;

public interface EmailService {
    void sendSimpleMail(String to, String subject, String body);
}
