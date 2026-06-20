# TEHI Dashboard App

Flutter Web dashboard scaffold for TEHI model monitoring and administration.

## Purpose

- Display model metrics and operational health
- Review prediction history
- Surface user and system activity
- Provide a browser-first admin experience

## Local Setup

```bash
flutter pub get
flutter run -d chrome
```

## Production Build

```bash
flutter build web --release
```

## Suggested Packages

- `http` for API requests
- `provider` for state management
- `fl_chart` for charts
- `intl` for formatting
- `responsive_framework` for layout scaling

## Notes

- This app is still a scaffold, so implement screens and API wiring as needed.
- Keep dashboard-only assets out of the mobile app folder so the two clients stay independent.
