class ApiConfig {
  const ApiConfig._();

  // For simulator/emulator testing, replace with your backend host.
  static const String baseUrl = 'http://localhost:8000';

  static const String predictPath = '/api/predict';
  static const String healthPath = '/api/health';
}
