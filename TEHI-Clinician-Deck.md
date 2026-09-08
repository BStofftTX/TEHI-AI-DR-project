# TEHI Clinician Deck

## Slide 1 - Title
**TEHI - The Eyes Have It**

Prototype screening workflow for:
- Diabetic Retinopathy
- Cardiovascular Risk

Tagline:
**Your Eyes. Your Health. Detected.**

---

## Slide 2 - Clinical problem
- Diabetic retinopathy can progress before patients are aware of symptoms
- Cardiovascular risk indicators may be visible in ocular blood flow and retinal vessel patterns
- Access to specialist review is uneven, especially in rural or underserved settings
- Early screening and escalation are essential

---

## Slide 3 - Clinical intent
TEHI is designed as a **screening support workflow**, not a diagnostic replacement.

Clinical intent:
- enable image capture or upload
- run AI-assisted screening
- flag outputs for review
- support referral and escalation decisions

---

## Slide 4 - Screening targets
### Diabetic retinopathy
- Class 0: No DR
- Class 1: Mild DR
- Class 2: Moderate DR
- Class 3: Severe DR
- Class 4: Proliferative DR

### Cardiovascular screening
- 0: CVD unlikely
- 1: CVD likely

---

## Slide 5 - Workflow concept
1. capture or upload a fundus image
2. run screening workflow
3. receive preliminary output
4. review confidence and context
5. route to clinician review and follow-up

---

## Slide 6 - What is built now
- mobile-first TEHI prototype
- image upload workflow
- branded landing and results screens
- DR and CVD result presentation
- model integration path for future TensorFlow Lite deployment
- tests and architecture documentation

---

## Slide 7 - Important limitation
Current MVP limitations:
- no validated production models integrated yet
- no clinician calibration workflow yet
- no deployment hardening for field use yet
- no claim of diagnosis or treatment support

The current system is a **prototype screening scaffold** only.

---

## Slide 8 - Why the concept matters clinically
- supports earlier screening workflows
- could lower friction for first-pass evaluation
- may help identify cases needing escalation sooner
- may improve access in remote and underserved settings
- may support technician-assisted or mobile workflows

---

## Slide 9 - Future clinical requirements
Before real clinical use, TEHI would require:
- validated datasets
- model validation and calibration
- reproducible preprocessing pipeline
- clinician review workflow
- auditability and version tracking
- privacy, security, and compliance safeguards
- prospective evaluation and field testing

---

## Slide 10 - Potential use environments
- remote screening programs
- primary care referrals
- optometry or ophthalmology workflows
- technician-assisted mobile clinics
- community health screening events

---

## Slide 11 - Current development direction
Current focus:
- user flow
- app design system
- DR and CVD screening presentation
- TensorFlow Lite readiness
- future model insertion without rebuilding the app shell

---

## Slide 12 - Closing
**TEHI today:** prototype screening workflow

**TEHI goal:** support earlier detection, better referral timing, and broader access to ocular-image-based screening workflows, always with clinician oversight.
