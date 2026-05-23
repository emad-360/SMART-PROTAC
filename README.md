# SMART-PROTAC

Advanced deep learning for predicting PROTAC-mediated protein degradation with state-of-the-art accuracy.

## Techstack
### Frontend:
- React 19
- React Router DOM
- Vite
- TailwindCSS
- Axios
- Lucide React
### Backend:
- FastAPI
- Uvicorn 
- PyTorch
- PyTorch Geometric
- NumPy
- SciPy
- Pandas
- OpenBabel
- Fair-ESM
- SE3-Transformer-PyTorch

## Prerequisites

Install the following before setup:

- Python 3.11 or higher
- Conda (Miniconda or Anaconda)
- Node.js 18+ and npm (v20+ recommended)
- Git (for cloning the repository)
- CUDA-capable GPU (recommended for faster inference, but CPU works)

Verify:

```bash
python --version
conda --version
node -v
npm -v
```

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SMART-PROTAC

```

### 2. Add Model Checkpoint

The trained model checkpoint is not included in the repository.

Place the checkpoint file:

backend/models/SE3-PROTACs_final.pt

before starting the backend.

Expected structure:

```bash
backend/
└── models/
    └── SE3-PROTACs_final.pt
```

Access the checkpoint using the drive link:
https://drive.google.com/drive/folders/16liyD5F3RhumEnyHN0UYxKThk1GP5ZuX?usp=sharing


### 3. Backend Setup
- Open a new terminal

- Navigate to the backend directory and create a conda virtual environment and install the pip dependencies and run the backend server:

```bash
# 1. Navigate to the directory
cd backend

# 2. Create the conda environment
conda env create -f environment.yml

# 3. Activate the environment
conda activate protac-deploy

# 4. Install pip dependencies
pip install -r requirements.txt

# 5. Start the FastAPI backend development server
uvicorn main:app --reload
```
The backend will run on `http://localhost:8000`

### 3. Frontend Setup

- Open a new terminal

- Navigate to the frontend directory and install Node.js dependencies and run the frontend server:

```bash
# 1. Navigate to the directory
cd frontend

# 2. Install the frontend dependencies
npm install

# 3. Run the frontend server
nup run dev
```
The frontend will run on `http://localhost:5173`


### 4. Access the Application

**Access the Backend:**

The backend will run on `http://localhost:8000`

**Access the Frontend:**

The frontend will run on `http://localhost:5173`

## Project Structure

```
SMART-PROTAC/
├── backend/
│   ├── casestudy/
│   ├── models/
│   ├── inference.py
│   ├── main.py
│   ├── model.py
│   ├── model_loader.py
│   ├── preprocess.py
│   ├── requirements.txt
│   └── utils.py
│
├── frontend/
│   ├── public/
│   │   └── images/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── api.js
│   │   ├── main.jsx
│   │   └── styles/
│   │
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── README.md
├── LICENSE
└── .gitignore
```

## API Endpoints

- Visit `http://localhost:8000/docs` for testing
- `POST /predict` - Submit PROTAC data for degradation prediction
- `GET /health` - Health check endpoint

## Troubleshooting

N/A

## Notes

- First backend startup may download ESM model weights automatically.
- OpenBabel is installed via conda-forge through environment.yml.
- Initial startup may take several minutes.

## License

See LICENSE file for details.
