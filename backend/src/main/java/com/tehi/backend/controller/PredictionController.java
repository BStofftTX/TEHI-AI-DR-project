package com.tehi.backend.controller;

import com.tehi.backend.dto.ModelInfoResponse;
import com.tehi.backend.dto.PredictionResponse;
import com.tehi.backend.service.PredictionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Validated
public class PredictionController {

    private final PredictionService predictionService;

    @PostMapping(value = "/predict", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<PredictionResponse> predict(@RequestParam("image") MultipartFile image) {
        if (image.isEmpty()) {
            return ResponseEntity.badRequest().body(
                new PredictionResponse(
                    "Unknown",
                    0.0,
                    "backend_proxy",
                    "Uploaded image is empty."
                )
            );
        }

        return ResponseEntity.ok(predictionService.predict(image));
    }

    @GetMapping("/model-info")
    public ResponseEntity<ModelInfoResponse> modelInfo() {
        return ResponseEntity.ok(predictionService.modelInfo());
    }
}
