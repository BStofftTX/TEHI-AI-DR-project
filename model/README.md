# Model Workspace

This folder contains the TEHI research notebook and its shared conda environment.

## Contents

- `v1_efficientnet.ipynb` - main training and evaluation notebook
- `environment.bruce.yml` - shared conda environment

## Expected Paths

The notebook reads image data from:

- `data/train`
- `data/val`

It writes trained models and evaluation output to:

- `artifacts/`

## Setup

```bash
conda env create -f environment.bruce.yml
conda activate bruce
```

If the environment already exists, update it with:

```bash
conda env update -f environment.bruce.yml --prune
```

## Notes

- The dataset is not committed to git.
- Generated checkpoints, metrics, and plots should stay out of version control.
- The notebook uses a TensorFlow-based EfficientNet pipeline and is tuned for laptop-friendly runs.
