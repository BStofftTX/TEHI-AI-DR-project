import 'dart:convert';
import 'dart:io';

import 'package:http/http.dart' as http;
import 'package:mobile_app/models/prediction.dart';
import 'package:mobile_app/services/api_config.dart';

class ApiService {
  const ApiService();

  Future<Prediction> predictFromImage(File imageFile) async {
    final Uri uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.predictPath}');

    final http.MultipartRequest request = http.MultipartRequest('POST', uri)
      ..files.add(await http.MultipartFile.fromPath('image', imageFile.path));

    final http.StreamedResponse streamed = await request.send();
    final String body = await streamed.stream.bytesToString();

    if (streamed.statusCode < 200 || streamed.statusCode >= 300) {
      throw Exception(
        'Prediction request failed (${streamed.statusCode}): $body',
      );
    }

    final Object? decoded = jsonDecode(body);
    if (decoded is! Map<String, dynamic>) {
      throw Exception('Unexpected response format from backend');
    }

    return Prediction.fromJson(decoded).copyWith(source: 'backend_api');
  }

  Future<bool> isBackendHealthy() async {
    final Uri uri = Uri.parse('${ApiConfig.baseUrl}${ApiConfig.healthPath}');
    final http.Response response = await http.get(uri);
    return response.statusCode >= 200 && response.statusCode < 300;
  }
}
