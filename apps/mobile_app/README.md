# TEHI Mobile App

Flutter app for capturing fundus images and running diabetic retinopathy inference on iOS and Android.

## Stack

- Flutter 3 / Dart 3.10
- `image_picker` for image capture
- `http` for backend calls
- `tflite_flutter` for on-device inference
- `image` for image preprocessing

## Assets

Model assets live under `assets/models/`:

- `assets/models/dr_classifier.tflite`
- `assets/models/labels.txt`

## Local Setup

```bash
flutter pub get
flutter run
```

## Build Targets

- Android and iOS device builds
- Optional backend-driven inference if the model is not bundled locally

## Project Layout

```text
mobile_app/
├── lib/
├── assets/
│   └── models/
├── android/
├── ios/
└── test/
```
