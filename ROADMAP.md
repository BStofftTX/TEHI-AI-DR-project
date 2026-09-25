# TEHI Development Roadmap

This roadmap separates software demonstration work from the evidence required for any future clinical application.

## Phase 1 — Product workflow MVP

- [x] Mobile-first fundus-image upload flow
- [x] DR and CVD result schemas
- [x] Replaceable inference adapter
- [x] Deterministic stub for repeatable tests
- [x] Automated route and screening-engine tests
- [ ] Add representative product screenshots
- [ ] Expand accessibility and error-state coverage

## Phase 2 — Reproducible research pipeline

- [ ] Document dataset licenses, provenance, inclusion criteria, and limitations
- [ ] Define patient-level train, validation, and test partitions
- [ ] Implement versioned image-quality and preprocessing pipelines
- [ ] Establish experiment tracking and deterministic training configuration
- [ ] Define baseline metrics before model selection

**Evidence gate:** another researcher can reproduce the dataset manifest, preprocessing outputs, and baseline experiment from documented inputs.

## Phase 3 — Model development and evaluation

- [ ] Train a five-class diabetic-retinopathy model
- [ ] Establish the scientific basis and labeling strategy for CVD-risk modeling
- [ ] Evaluate discrimination, calibration, sensitivity, and specificity
- [ ] Evaluate performance across relevant demographic and acquisition subgroups
- [ ] Perform external validation using a held-out dataset or site
- [ ] Publish model cards with limitations and intended-use boundaries

**Evidence gate:** results are reproducible, externally evaluated, and reported with confidence intervals and known limitations.

## Phase 4 — Clinical workflow and safety

- [ ] Add clinician review and escalation paths
- [ ] Add model, preprocessing, and result audit trails
- [ ] Define privacy, retention, consent, and access-control requirements
- [ ] Complete threat modeling and security testing
- [ ] Conduct human-factors and workflow validation
- [ ] Define regulatory strategy before any clinical deployment

**Evidence gate:** documented clinical oversight, safety controls, security posture, and regulatory pathway support the proposed intended use.

## Phase 5 — Deployment readiness

- [ ] Validate supported cameras and image-acquisition conditions
- [ ] Add production monitoring and drift-detection plans
- [ ] Establish rollback, incident-response, and model-update procedures
- [ ] Complete prospective evaluation before patient-facing use

TEHI remains a research MVP until all applicable evidence, governance, clinical, security, and regulatory requirements are satisfied.
