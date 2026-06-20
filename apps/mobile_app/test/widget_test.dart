import 'package:flutter_test/flutter_test.dart';

import 'package:mobile_app/main.dart';

void main() {
  testWidgets('App renders TEHI home', (WidgetTester tester) async {
    await tester.pumpWidget(const MyApp());

    expect(find.text('TEHI Mobile'), findsOneWidget);
    expect(find.text('Capture Image'), findsOneWidget);
    expect(find.text('View Last Result'), findsOneWidget);
  });
}
