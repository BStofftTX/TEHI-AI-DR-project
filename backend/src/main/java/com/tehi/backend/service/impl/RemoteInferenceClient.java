package com.tehi.backend.service.impl;

import com.tehi.backend.dto.PredictionResponse;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Component
@RequiredArgsConstructor
@Slf4j
public class RemoteInferenceClient {

    private final RestClient.Builder restClientBuilder;

    @Value("${inference.base-url:}")
    private String inferenceBaseUrl;

    @Value("${inference.predict-path:/predict}")
    private String inferencePredictPath;

    public PredictionResponse predict(MultipartFile image) {
        if (inferenceBaseUrl == null || inferenceBaseUrl.isBlank()) {
            return new PredictionResponse(
                "Unknown",
                0.0,
                "backend_proxy",
                "Inference service URL is not configured. Set inference.base-url."
            );
        }

        try {
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
            body.add("image", asNamedResource(image));

            PredictionResponse remote = restClientBuilder.baseUrl(inferenceBaseUrl)
                .build()
                .post()
                .uri(inferencePredictPath)
                .contentType(MediaType.MULTIPART_FORM_DATA)
                .body(body)
                .retrieve()
                .body(PredictionResponse.class);

            if (remote == null) {
                return new PredictionResponse(
                    "Unknown",
                    0.0,
                    "backend_proxy",
                    "Inference service returned an empty response."
                );
            }

            return new PredictionResponse(
                remote.label(),
                remote.confidence(),
                remote.source() == null || remote.source().isBlank() ? "remote_inference" : remote.source(),
                remote.notes()
            );
        } catch (Exception ex) {
            log.warn("Remote inference call failed: {}", ex.getMessage());
            return new PredictionResponse(
                "Unknown",
                0.0,
                "backend_proxy",
                "Remote inference error: " + ex.getMessage()
            );
        }
    }

    private ByteArrayResource asNamedResource(MultipartFile image) throws IOException {
        String filename = image.getOriginalFilename() == null ? "upload.jpg" : image.getOriginalFilename();
        byte[] content = image.getBytes();

        return new ByteArrayResource(content) {
            @Override
            public String getFilename() {
                return filename;
            }
        };
    }
}
