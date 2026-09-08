# TEHI MVP Architecture

## Goal

Provide a working prototype for a smartphone-first screening workflow using fundus images while keeping the inference layer replaceable.

## Current architecture

### Presentation layer
- Mobile-first responsive HTML rendered from Node.js
- Camera-or-gallery upload interaction for a fundus image
- Results page showing DR 5-class screening and CVD binary screening
- Integration page showing TensorFlow Lite readiness
- Strong disclaimer language to avoid medical misuse

### Application layer
- Route handlers for landing page and screening submission
- Screening engine that coordinates image summary + inference output formatting
- Confidence and rationale fields presented as prototype-only indicators

### Inference layer
- `stubModel.js` intentionally avoids fake medical claims while producing deterministic, testable outputs
- `adapters/stubAdapter.js` is the currently active adapter
- `adapters/tfliteAdapter.js` is a placeholder seam for future TensorFlow Lite integration
- The stub uses file metadata and hash-like heuristics only to drive consistent demo behavior
- This lets the app flow be tested before real model artifacts exist

### Future production inference layer
A production version should:
- preprocess fundus images consistently
- load versioned `.tflite` artifacts and preprocessing metadata
- run a real DR multi-class model
- run a real CVD binary risk model
- return calibrated probabilities
- log model version and preprocessing version
- support clinician review and auditability

## Testing strategy

The MVP tests:
- screening engine returns the expected schema
- routes return HTML successfully
- disclaimer and category outputs are present

## Product direction

This structure supports three future surfaces:
1. smartphone web app prototype
2. mobile app wrapper
3. clinic-facing technician workflow
