# TEHI MVP Demo Deck

## Slide 1 - Title
**TEHI - The Eyes Have It**

Smartphone-first AI screening prototype for:
- Diabetic Retinopathy
- Cardiovascular Risk

Tagline:
**Your Eyes. Your Health. Detected.**

---

## Slide 2 - Problem
**Why TEHI matters**

- Diabetic retinopathy is often caught too late
- Cardiovascular disease is frequently underdetected until symptoms escalate
- Rural and underserved populations have less access to specialists and advanced imaging workflows
- Existing workflows can be expensive, invasive, slow, and hard to scale

TEHI is designed to create a low-friction screening workflow using fundus images and AI-assisted analysis.

---

## Slide 3 - Vision
**What TEHI aims to do**

TEHI is intended to enable a user or field technician to:
1. capture or upload a fundus image
2. run AI-assisted screening
3. receive screening-oriented outputs for:
   - 5-class diabetic retinopathy level
   - binary cardiovascular risk indication
4. escalate to clinician review when needed

Important:
TEHI is a **screening aid**, not a replacement for medical diagnosis.

---

## Slide 4 - Current MVP
**What is built now**

- mobile-first TEHI landing page
- phone-style app presentation
- image upload workflow
- prototype screening results page
- DR and CVD result cards
- TensorFlow Lite integration path
- runnable tests and architecture documentation

The current MVP is a **working product scaffold** ready for real model integration.

---

## Slide 5 - Current workflow
**Prototype user flow**

1. open TEHI mobile-style interface
2. capture or upload a fundus image
3. submit image to screening flow
4. receive:
   - DR class output
   - CVD binary output
   - confidence indicators
   - prototype disclaimer and next-step guidance

---

## Slide 6 - Technical architecture
**How the MVP is structured**

- Node.js app server
- mobile-first HTML/CSS interface
- screening engine
- stub inference adapter for deterministic demo behavior
- future TensorFlow Lite adapter seam for production models
- test coverage for core workflow pages

This keeps the product moving now while preserving a clean path to validated models later.

---

## Slide 7 - Why this approach is smart
**Why build the MVP before final models**

- proves user experience and workflow early
- gives stakeholders something concrete to review
- reduces risk before model integration
- clarifies product requirements
- supports fundraising, demos, and partnership conversations
- allows real model artifacts to be inserted later without rebuilding the app shell

---

## Slide 8 - Next steps
**What comes next**

1. finalize visual design direction
2. expand to full multi-screen app flow
3. locate or rebuild model training assets
4. integrate DR model
5. integrate CVD model
6. validate preprocessing and output calibration
7. prepare clinician review workflow and compliance hardening

---

## Slide 9 - Deployment concept
**Future deployment model**

Potential use cases:
- smartphone screening in remote communities
- clinic intake or technician-assisted screening
- optometry or ophthalmology workflow augmentation
- early triage and referral support

This supports Bruce Stofft's broader research vision of accessible, lower-cost ocular-image screening.

---

## Slide 10 - Closing
**TEHI today**
- working MVP prototype
- clear app design direction
- DR + CVD screening workflow scaffold
- ready for visual refinement and model integration

**TEHI tomorrow**
- validated AI screening workflow
- mobile deployment path
- stronger early-detection support for underserved populations
