import 'package:flutter/material.dart';
import 'package:mobile_app/models/prediction.dart';
import 'dart:io';

class ResultsScreen extends StatelessWidget {
  const ResultsScreen({super.key, required this.prediction, this.imagePath});

  final Prediction prediction;
  final String? imagePath;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Classification Result')),
      body: SafeArea(
        child: ListView(
          padding: const EdgeInsets.all(20),
          children: [
            if (imagePath != null) ...[
              ClipRRect(
                borderRadius: BorderRadius.circular(12),
                child: Image.file(
                  File(imagePath!),
                  height: 220,
                  fit: BoxFit.cover,
                ),
              ),
              const SizedBox(height: 16),
            ],
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text('Label: ${prediction.label}'),
                    const SizedBox(height: 8),
                    Text(
                      'Confidence: ${(prediction.confidence * 100).toStringAsFixed(1)}%',
                    ),
                    const SizedBox(height: 8),
                    Text('Source: ${prediction.source}'),
                    if (prediction.notes != null &&
                        prediction.notes!.isNotEmpty)
                      Padding(
                        padding: const EdgeInsets.only(top: 8),
                        child: Text('Notes: ${prediction.notes}'),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
