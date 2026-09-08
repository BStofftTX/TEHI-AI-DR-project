# TEHI 2022 Diabetic Retinopathy Research

This directory preserves selected artifacts from the original 2022 graduate-school computer-vision work that became part of **TEHI — The Eyes Have It**.

The work explored transfer learning for five-class diabetic retinopathy classification from retinal fundus images using **Inception v3** and **VGG19**.

## Classification Labels

The recovered notebooks define five classes:

1. `0 No_DR`
2. `1 Mild`
3. `2 Moderate`
4. `3 Severe`
5. `4 Proliferate_DR`

## Experimental Setup

Verified from the recovered notebooks:

- Input image size: **224 × 224**
- Batch size: **32**
- Pretrained weights: **ImageNet**
- Classification head: global average pooling + softmax output
- Optimizer: **Adam**
- Loss: **categorical cross-entropy**
- Data augmentation included rotation, width/height shifts, shear, zoom, and horizontal flipping
- Evaluation work included prediction on held-out images and confusion-matrix analysis
- Models were saved in TensorFlow/Keras SavedModel format

## Inception v3

The archived Inception v3 notebook contains a recorded **10-epoch** training run.

### Recorded results

- Final training accuracy: **73.89%**
- Final validation accuracy: **70.78%**
- Best validation accuracy visible in the recovered run output: **74.38%** at epoch 9

These values describe the historical notebook run only. They are not presented as independent clinical-validation results.

## VGG19

The archived VGG19 notebook contains a recorded **50-epoch** training run using transfer learning with the pretrained base layers frozen.

### Recorded results

- Final training accuracy: **79.44%**
- Final validation accuracy: **74.22%**
- Best validation accuracy visible in the recovered run output: **76.88%** at epoch 46

For the recovered experiments, VGG19 achieved the higher visible validation accuracy.

## Repository Contents

```text
notebooks/
    Diabetic_Retinopathy_Detection_Inception_v3 copy.ipynb
    Diabetic_Retinopathy_Detection_VGG19 copy.ipynb

results/
    Historical training-result screenshots

papers/
    Stofft DR paper-Stofft_Allu.docx
```

The original trained model directories are retained in the local research archive rather than committed here because the two SavedModel directories total roughly **165 MB**.

## Historical Context

These artifacts represent graduate research from **2022** and are preserved to document the technical foundation from which TEHI developed.

The current TEHI MVP is a separate 2026 product-development layer. Its present inference implementation is intentionally a deterministic **stub**, not these historical research models. Integrating or reproducing validated models is future work.

## Limitations

The accuracy values above come from recovered historical notebook output. They should not be interpreted as:

- clinical diagnostic performance
- independently reproduced results
- prospective validation
- regulatory validation
- performance on a current production dataset

A modern reproduction should document dataset provenance, class distribution, train/validation/test separation, preprocessing, calibration, and appropriate clinical evaluation metrics before drawing conclusions about model performance.

## Medical Disclaimer

This material is preserved for research, educational, and portfolio purposes. It is **not a medical diagnostic system** and should not be used to make medical decisions.
