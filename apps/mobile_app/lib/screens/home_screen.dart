import 'package:flutter/material.dart';
import 'package:mobile_app/models/prediction.dart';
import 'package:mobile_app/screens/camera_screen.dart';
import 'package:mobile_app/screens/results_screen.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('TEHI Mobile')),
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.all(20),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Diabetic Retinopathy Assistant',
                style: Theme.of(context).textTheme.headlineSmall,
              ),
              const SizedBox(height: 8),
              Text(
                'Capture a fundus image and run classification.',
                style: Theme.of(context).textTheme.bodyMedium,
              ),
              const SizedBox(height: 24),
              SizedBox(
                width: double.infinity,
                child: FilledButton.icon(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => const CameraScreen(),
                      ),
                    );
                  },
                  icon: const Icon(Icons.camera_alt_outlined),
                  label: const Text('Capture Image'),
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                width: double.infinity,
                child: OutlinedButton.icon(
                  onPressed: () {
                    Navigator.of(context).push(
                      MaterialPageRoute<void>(
                        builder: (_) => const ResultsScreen(
                          prediction: Prediction(
                            label: 'Moderate',
                            confidence: 0.81,
                            source: 'sample',
                            notes: 'Sample data from Home screen shortcut.',
                          ),
                        ),
                      ),
                    );
                  },
                  icon: const Icon(Icons.analytics_outlined),
                  label: const Text('View Last Result'),
                ),
              ),
              const Spacer(),
              const Text(
                'Capture screen now supports backend and local modes.',
              ),
            ],
          ),
        ),
      ),
    );
  }
}
