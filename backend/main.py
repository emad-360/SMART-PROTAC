from fastapi import FastAPI, UploadFile, File
from fastapi import HTTPException

from inference import predict_single

from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:5173"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"]
)

def validate_file(file, allowed):

    ext = file.filename.split(".")[-1].lower()

    if ext not in allowed:
        raise ValueError(
            f"Invalid file: {file.filename}"
        )


def parse_smi(content: bytes):

    return (
        content
        .decode()
        .splitlines()[0]
        .strip()
    )


def parse_fasta(content: bytes):

    lines = (
        content
        .decode()
        .splitlines()
    )

    return "".join(
        line.strip()
        for line in lines
        if not line.startswith(">")
    )

@app.get("/")
def root():

    return {

        "message":
        "SMART-PROTAC API",

        "docs":
        "/docs",

        "health":
        "/health",

        "predict":
        "/predict"
    }

@app.post("/predict")
async def predict(

    ligase_smi: UploadFile = File(...),
    ligase_fa: UploadFile = File(...),

    target_smi: UploadFile = File(...),
    target_fa: UploadFile = File(...),

    linker_smi: UploadFile = File(...)

):

    try:

        validate_file(
            ligase_smi,
            ["smi"]
        )

        validate_file(
            target_smi,
            ["smi"]
        )

        validate_file(
            linker_smi,
            ["smi"]
        )

        validate_file(
            ligase_fa,
            ["fa"]
        )

        validate_file(
            target_fa,
            ["fa"]
        )

        ligase_smi_text = parse_smi(
            await ligase_smi.read()
        )

        ligase_seq = parse_fasta(
            await ligase_fa.read()
        )

        target_smi_text = parse_smi(
            await target_smi.read()
        )

        target_seq = parse_fasta(
            await target_fa.read()
        )

        linker_smi_text = parse_smi(
            await linker_smi.read()
        )

        return predict_single(

            ligase_smi_text,
            ligase_seq,

            target_smi_text,
            target_seq,

            linker_smi_text
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e)
        )
    

@app.get("/health")
def health():

    return {
        "status":"ok"
    }