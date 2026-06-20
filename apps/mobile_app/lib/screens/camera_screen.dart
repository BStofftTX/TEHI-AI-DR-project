import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_picker/image_picker.dart';
import 'package:mobile_app/models/prediction.dart';
import 'package:mobile_app/screens/results_screen.dart';
import 'package:mobile_app/services/api_service.dart';
import 'package:mobile_app/services/model_service.dart';

class CameraScreen extends StatefulWidget {
  const CameraScreen({super.key});

  @override
  State<CameraScreen> createState() => _CameraScreenState();
}

class _CameraScreenState extends State<CameraScreen> {
  final ImagePicker _picker = ImagePicker();
  final ApiService _apiService = const ApiService();
  final ModelService _modelService = ModelService();

  File? _selectedImage;
  Prediction? _lastPrediction;
  String? _errorMessage;
  bool _isBusy = false;

  Future<void> _pickFromCamera() async {
    await _pickImage(ImageSource.camera);
  }

  Future<void> _pickFromGallery() async {
    await _pickImage(ImageSource.gallery);
  }

  Future<void> _pickImage(ImageSource source) async {
    try {
      final XFile? file = await _picker.pickImage(
        source: source,
        imageQuality: 90,
        maxWidth: 2048,
      );

      if (file == null) {
        return;
      }

      setState(() {
        _selectedImage = File(file.path);
        _lastPrediction = null;
        _errorMessage = null;
      });
    } on Exception catch (e) {
      setState(() {
        _errorMessage = 'Image selection failed: $e';
      });
    }
  }

  Future<void> _runBackendPrediction() async {
    final File? image = _selectedImage;
    if (image == null) {
      setState(() {
        _errorMessage = 'Capture or select an image first.';
      });
      return;
    }

    setState(() {
      _isBusy = true;
      _errorMessage = null;
    });

    try {
      final Prediction prediction = await _apiService.predictFromImage(image);
      if (!mounted) {
        return;
      }

      setState(() {
        _lastPrediction = prediction;
      });

      await Navigator.of(context).push(
        MaterialPageRoute<void>(
          builder: (_) =>
              ResultsScreen(prediction: prediction, imagePath: image.path),
        ),
      );
    } on Exception catch (e) {
      setState(() {
        _errorMessage = 'Backend prediction failed: $e';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isBusy = false;
        });
      }
    }
  }

  Future<void> _runLocalPrediction() async {
    final File? image = _selectedImage;
    if (image == null) {
      setState(() {
        _errorMessage = 'Capture or select an image first.';
      });
      return;
    }

    setState(() {
      _isBusy = true;
      _errorMessage = null;
    });

    try {
      final Prediction prediction = await _modelService.predictFromImage(image);
      if (!mounted) {
        return;
      }

      setState(() {
        _lastPrediction = prediction;
      });

      await Navigator.of(context).push(
        MaterialPageRoute<void>(
          builder: (_) =>
              ResultsScreen(prediction: prediction, imagePath: image.path),
        ),
      );
    } on Exception catch (e) {
      setState(() {
        _errorMessage = 'Local prediction failed: $e';
      });
    } finally {
      if (mounted) {
        setState(() {
          _isBusy = false;
        });
      }
    }
  }

  @override
  void dispose() {
    _modelService.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final File? image = _selectedImage;

    return Scaffold(
      appBar: AppBar(title: const Text('Capture')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            if (image != null)
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(image, height: 240, fit: BoxFit.cover),
              )
            else
              Container(
                height: 220,
                decoration: BoxDecoration(
                  color: Theme.of(context).colorScheme.surfaceContainerHighest,
                  borderRadius: BorderRadius.circular(12),
                ),
                child: const Center(child: Text('No image selected')),
              ),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(
                  child: FilledButton.icon(
                    onPressed: _isBusy ? null : _pickFromCamera,
                    icon: const Icon(Icons.photo_camera_outlined),
                    label: const Text('Camera'),
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: OutlinedButton.icon(
                    onPressed: _isBusy ? null : _pickFromGallery,
                    icon: const Icon(Icons.photo_library_outlined),
                    label: const Text('Gallery'),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            SizedBox(
              width: double.infinity,
              child: FilledButton.icon(
                onPressed: _isBusy ? null : _runBackendPrediction,
                icon: const Icon(Icons.cloud_outlined),
                label: const Text('Predict via Backend'),
              ),
            ),
            const SizedBox(height: 10),
            SizedBox(
              width: double.infinity,
              child: OutlinedButton.icon(
                onPressed: _isBusy ? null : _runLocalPrediction,
                icon: const Icon(Icons.memory_outlined),
                label: const Text('Predict via Local TFLite'),
              ),
            ),
            if (_isBusy)
              const Padding(
                padding: EdgeInsets.only(top: 16),
                child: Center(child: CircularProgressIndicator()),
              ),
            if (_lastPrediction != null)
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Text(
                  'Last prediction: ${_lastPrediction!.label} '
                  '(${(_lastPrediction!.confidence * 100).toStringAsFixed(1)}%) '
                  'from ${_lastPrediction!.source}',
                ),
              ),
            if (_errorMessage != null)
              Padding(
                padding: const EdgeInsets.only(top: 16),
                child: Text(
                  _errorMessage!,
                  style: TextStyle(color: Theme.of(context).colorScheme.error),
                ),
              ),
          ],
        ),
      ),
    );
  }
}
