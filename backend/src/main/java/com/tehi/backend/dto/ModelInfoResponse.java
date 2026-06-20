package com.tehi.backend.dto;

import java.util.List;

public record ModelInfoResponse(
    String name,
    String inputSize,
    List<String> classes
) {}
