# TEHI — The Eyes Have It

This project uses fundus (retinal) images to classify diabetic retinopathy severity and explore cardiovascular disease indicators. The goal is a working mobile app backed by a trained deep learning model, starting with the research notebook here and eventually shipping a Flutter app with a Java backend.

## What's in Here

The main notebook (`dr_exploration_efficientnet.ipynb`) walks through the full pipeline:

1. Explore the train/validation image folders and check class balance.
2. Build image loading and augmentation pipelines.
3. Train an EfficientNet model — first with the backbone frozen, then with fine-tuning.
4. Evaluate results: confusion matrix, per-class metrics, calibration, and uncertainty.
5. Save the trained model (Keras format and optionally TFLite for mobile).

## Getting Started

We use a shared conda environment called `bruce` so everyone runs the same Python and package versions.

### Step 1 — Create the environment

```bash
conda env create -f environment.bruce.yml
```

Already have it? Update instead:

```bash
conda env update -f environment.bruce.yml --prune
```

### Step 2 — Activate it

```bash
conda activate bruce
```

### Step 3 — Register the Jupyter kernel

This only needs to be done once per machine:

```bash
python -m ipykernel install --user --name bruce --display-name "Python (bruce)"
```

### Step 4 — Quick sanity check

```bash
python -c "import tensorflow as tf, seaborn as sns, pandas as pd; print(tf.__version__)"
```

## Opening the Notebook in VS Code

1. Open `dr_exploration_efficientnet.ipynb`.
2. Click the kernel name in the top-right corner of the notebook.
3. Choose `Python (bruce)`.
4. Run cells top to bottom.

## macOS Notes

This setup uses `tensorflow-macos` and `tensorflow-metal` for Apple Silicon. The notebook defaults (EfficientNetB0, small batch size, limited pipeline parallelism) are intentionally conservative to avoid kernel crashes on laptops. If you hit memory issues, drop `BATCH_SIZE` to `4`.

## Dataset

### Where to download

Head to Kaggle and grab the dataset from here:
[https://www.kaggle.com/datasets/vuppalaadithyasairam/fundus-images-for-diabetic-retinopathy](https://www.kaggle.com/datasets/vuppalaadithyasairam/fundus-images-for-diabetic-retinopathy)

You'll need a free Kaggle account. Click **Download**, then unzip the archive.

### Where to put it

Create a `data/` folder at the root of this repo and place the unzipped contents inside it so the structure looks like this:

```text
TEHI-AI-DR-project/
├── data/
│   ├── train/
│   │   ├── Mild/
│   │   ├── Moderate/
│   │   ├── Normal/
│   │   ├── Proliferate/
│   │   └── Severe/
│   └── val/
│       ├── Mild/
│       ├── Moderate/
│       ├── Normal/
│       ├── Proliferate/
│       └── Severe/
├── dr_exploration_efficientnet.ipynb
└── ...
```

The `data/` folder is in `.gitignore`, so it won't be pushed to the repo. Everyone on the team needs to download and place it locally.

## What the Notebook Saves

After a full run, outputs land in `artifacts/`:

- The best model checkpoint and a final saved model
- Optional TFLite export (for mobile)
- CSV files with all the evaluation numbers
- Plots: confusion matrix, ROC/PR curves, calibration diagrams, uncertainty visuals
- A timestamped run folder so you can compare experiments

`artifacts/` is also in `.gitignore` — don't commit trained models to the repo.

## The App Plan (Flutter + Java)

The longer-term goal is a smartphone app called TEHI (The Eyes Have It) that lets a clinician photograph the eye and get a retinopathy classification on the spot.

### How it'll work

- A Flutter mobile app handles image capture and shows results to the user.
- A Java/Spring Boot backend handles image storage, model inference, user accounts, and audit logs.
- Short term: inference runs on the server.
- Longer term: we ship the TFLite model inside the app for offline/low-latency use.

### Rough roadmap

1. **Lock down the model** — settle on a final checkpoint and evaluation standard.
2. **Backend first pass** — build upload, inference, and results endpoints in Spring Boot.
3. **Flutter first pass** — capture or upload an image, display the prediction and confidence.
4. **Calibration layer** — surface calibrated probabilities and flag low-confidence cases for human review.
5. **On-device inference** — integrate TFLite into Flutter and compare it against server-side results.

## Quick Start

```bash
conda activate bruce
code dr_exploration_efficientnet.ipynb
```

Pick the `Python (bruce)` kernel and run all cells in order.
