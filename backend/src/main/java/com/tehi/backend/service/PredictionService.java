package com.tehi.backend.service;

import com.tehi.backend.dto.ModelInfoResponse;
import com.tehi.backend.dto.PredictionResponse;
import org.springframework.web.multipart.MultipartFile;

public interface PredictionService {
    PredictionResponse predict(MultipartFile image);
    ModelInfoResponse modelInfo();
}
