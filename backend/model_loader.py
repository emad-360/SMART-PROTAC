import torch
from model import *
from utils import *
# ------------------------------------------------------------------
# Config
# ------------------------------------------------------------------
MODEL_PATH = "models/SE3-PROTACs_final.pt"
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ------------------------------------------------------------------
# Load model
# ------------------------------------------------------------------
def load_model():
    target_ligand_model = GraphTransformer(num_embeddings=10)
    ligase_ligand_model = GraphTransformer(num_embeddings=10)
    linker_model = GraphTransformer(num_embeddings=10)

    ligase_model = ESMWrapper()
    target_model = ESMWrapper()

    model = Model(
        ligase_ligand_model=ligase_ligand_model,
        ligase_model=ligase_model,
        target_ligand_model=target_ligand_model,
        target_model=target_model,
        linker_model=linker_model,
    )

    ckpt = torch.load(
    MODEL_PATH,
    map_location=DEVICE,
    weights_only=False
    )

    model.load_state_dict(ckpt["model_state_dict"])

    model.to(DEVICE)
    model.eval()
    
    return model

MODEL = load_model()

ESM = ESMEmbedder(
device=str(DEVICE)
)
