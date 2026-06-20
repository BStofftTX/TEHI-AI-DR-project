class Prediction {
  const Prediction({
    required this.label,
    required this.confidence,
    required this.source,
    this.notes,
  });

  final String label;
  final double confidence;
  final String source;
  final String? notes;

  Prediction copyWith({
    String? label,
    double? confidence,
    String? source,
    String? notes,
  }) {
    return Prediction(
      label: label ?? this.label,
      confidence: confidence ?? this.confidence,
      source: source ?? this.source,
      notes: notes ?? this.notes,
    );
  }

  Map<String, dynamic> toJson() {
    return <String, dynamic>{
      'label': label,
      'confidence': confidence,
      'source': source,
      'notes': notes,
    };
  }

  factory Prediction.fromJson(Map<String, dynamic> json) {
    return Prediction(
      label: json['label'] as String? ?? 'Unknown',
      confidence: (json['confidence'] as num?)?.toDouble() ?? 0.0,
      source: json['source'] as String? ?? 'unknown',
      notes: json['notes'] as String?,
    );
  }
}
