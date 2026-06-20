package com.tehi.backend.dto;

public record PredictionResponse(
    String label,
    double confidence,
    String source,
    String notes
) {}
