package com.tehi.backend.service.impl;

import com.tehi.backend.dto.ModelInfoResponse;
import com.tehi.backend.dto.PredictionResponse;
import com.tehi.backend.service.PredictionService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class PredictionServiceImpl implements PredictionService {

    private final RemoteInferenceClient remoteInferenceClient;

    @Override
    public PredictionResponse predict(MultipartFile image) {
        return remoteInferenceClient.predict(image);
    }

    @Override
    public ModelInfoResponse modelInfo() {
        return new ModelInfoResponse(
            "EfficientNetB0",
            "224x224x3",
            List.of("Mild", "Moderate", "Normal", "Proliferate", "Severe")
        );
    }
}
