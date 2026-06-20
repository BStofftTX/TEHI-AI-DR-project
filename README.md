# TEHI - The Eyes Have It

TEHI is a diabetic retinopathy project built around fundus image classification. The repo currently contains the research notebook, a Spring Boot API, and Flutter app scaffolds for mobile and dashboard use cases.

## Repository Layout

```text
TEHI-AI-DR-project/
├── model/                  # Training notebook and environment file
├── backend/                # Spring Boot API
├── apps/
│   ├── mobile_app/        # Flutter mobile client
│   └── dashboard_app/     # Flutter web dashboard scaffold
└── README.md
```

## Current Pieces

- `model/v1_efficientnet.ipynb` trains and evaluates an EfficientNet-based classifier.
- `model/environment.bruce.yml` defines the shared conda environment for notebook work.
- `backend/` exposes health, auth, prediction, and model-info endpoints.
- `apps/mobile_app/` captures retinal images and can run local TFLite inference or call the backend.
- `apps/dashboard_app/` is the admin/monitoring frontend scaffold.

## Model Workflow

The notebook expects image data in `data/train` and `data/val`, then writes outputs to `artifacts/`.

Typical outputs include:

- Saved Keras checkpoints
- Optional TFLite exports
- Evaluation CSVs and plots
- Timestamped run folders for experiment tracking

## Shared Environment

Create the notebook environment with:

```bash
conda env create -f model/environment.bruce.yml
conda activate bruce
```

If the environment already exists, update it with:

```bash
conda env update -f model/environment.bruce.yml --prune
```

## Running The Pieces

- Backend: see [`backend/README.md`](backend/README.md)
- Mobile app: see [`apps/mobile_app/README.md`](apps/mobile_app/README.md)
- Dashboard app: see [`apps/dashboard_app/README.md`](apps/dashboard_app/README.md)
- Model notebook: see [`model/README.md`](model/README.md)

## Notes

- The notebook and the app asset folders are set up for local development, so raw datasets and generated artifacts stay out of git.
- If you are working on the model, make sure the Kaggle fundus dataset is unpacked into `data/` before running the notebook.
