import 'dart:io';
import 'dart:math' as math;
import 'dart:typed_data';

import 'package:flutter/services.dart' show rootBundle;
import 'package:image/image.dart' as img;
import 'package:mobile_app/models/prediction.dart';
import 'package:tflite_flutter/tflite_flutter.dart';

class ModelService {
  ModelService();

  static const String _defaultModelAsset = 'assets/models/dr_classifier.tflite';
  static const String _defaultLabelsAsset = 'assets/models/labels.txt';
  static const int _defaultInputSize = 224;

  Interpreter? _interpreter;
  List<String>? _labels;

  Future<void> loadModel({String modelAsset = _defaultModelAsset}) async {
    _interpreter ??= await Interpreter.fromAsset(modelAsset);
    _labels ??= await _loadLabels();
  }

  Future<Prediction> predictFromImage(File imageFile) async {
    try {
      await loadModel();
      final Interpreter interpreter = _interpreter!;

      final List<int> inputShape = interpreter.getInputTensor(0).shape;
      final int inputHeight = inputShape.length > 1
          ? inputShape[1]
          : _defaultInputSize;
      final int inputWidth = inputShape.length > 2
          ? inputShape[2]
          : _defaultInputSize;
      final List<List<List<List<double>>>> input = await _preprocessImage(
        imageFile,
        targetWidth: inputWidth,
        targetHeight: inputHeight,
      );

      final List<int> outputShape = interpreter.getOutputTensor(0).shape;
      final int outputClasses = outputShape.isNotEmpty
          ? outputShape.last
          : (_labels?.length ?? 5);
      final List<List<double>> output = List<List<double>>.generate(
        1,
        (_) => List<double>.filled(outputClasses, 0),
      );

      interpreter.run(input, output);

      final List<double> probabilities = _normalizeProbabilities(output.first);
      final int topIndex = _argMax(probabilities);
      final List<String> labels = _labels ?? _defaultLabels();
      final String label = topIndex < labels.length
          ? labels[topIndex]
          : 'Class $topIndex';

      return Prediction(
        label: label,
        confidence: probabilities[topIndex],
        source: 'local_tflite',
        notes:
            'Local inference succeeded for ${imageFile.path.split('/').last}.',
      );
    } on Exception catch (e) {
      return Prediction(
        label: 'Unknown',
        confidence: 0.0,
        source: 'local_tflite',
        notes: 'Failed to run local model: $e',
      );
    }
  }

  Future<List<List<List<List<double>>>>> _preprocessImage(
    File imageFile, {
    required int targetWidth,
    required int targetHeight,
  }) async {
    final Uint8List bytes = await imageFile.readAsBytes();
    final img.Image? decoded = img.decodeImage(bytes);
    if (decoded == null) {
      throw Exception('Unsupported or invalid image format.');
    }

    final img.Image resized = img.copyResize(
      decoded,
      width: targetWidth,
      height: targetHeight,
      interpolation: img.Interpolation.cubic,
    );

    // The model graph already includes EfficientNet preprocessing.
    return <List<List<List<double>>>>[
      List<List<List<double>>>.generate(targetHeight, (int y) {
        return List<List<double>>.generate(targetWidth, (int x) {
          final img.Pixel pixel = resized.getPixel(x, y);
          return <double>[
            pixel.r.toDouble(),
            pixel.g.toDouble(),
            pixel.b.toDouble(),
          ];
        });
      }),
    ];
  }

  List<double> _normalizeProbabilities(List<double> raw) {
    if (raw.isEmpty) {
      return <double>[1.0];
    }

    final double sum = raw.fold<double>(
      0,
      (double acc, double value) => acc + value,
    );
    if (sum > 0) {
      return raw.map((double value) => value / sum).toList();
    }

    final double maxLogit = raw.reduce((double a, double b) => a > b ? a : b);
    final List<double> exps = raw
        .map((double value) => math.exp(value - maxLogit))
        .toList();
    final double expSum = exps.fold<double>(
      0,
      (double acc, double value) => acc + value,
    );
    if (expSum == 0) {
      return List<double>.filled(raw.length, 1.0 / raw.length);
    }
    return exps.map((double value) => value / expSum).toList();
  }

  int _argMax(List<double> values) {
    int bestIndex = 0;
    for (int i = 1; i < values.length; i++) {
      if (values[i] > values[bestIndex]) {
        bestIndex = i;
      }
    }
    return bestIndex;
  }

  Future<List<String>> _loadLabels() async {
    try {
      final String text = await rootBundle.loadString(_defaultLabelsAsset);
      final List<String> labels = text
          .split('\n')
          .map((String line) => line.trim())
          .where((String line) => line.isNotEmpty)
          .toList();
      return labels.isEmpty ? _defaultLabels() : labels;
    } on Exception {
      return _defaultLabels();
    }
  }

  List<String> _defaultLabels() {
    return <String>['Mild', 'Moderate', 'Normal', 'Proliferate', 'Severe'];
  }

  void dispose() {
    _interpreter?.close();
    _interpreter = null;
    _labels = null;
  }
}
