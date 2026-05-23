import torch
from preprocess import mol2graph
from model_loader import MODEL
from model_loader import ESM

import warnings

warnings.filterwarnings("ignore")

# ------------------------------------------------------------------
# Config
# ------------------------------------------------------------------
DEVICE = torch.device("cuda" if torch.cuda.is_available() else "cpu")

LIGAND_ATOM_TYPE = ['C', 'N', 'O', 'S', 'F', 'Cl', 'Br', 'I', 'P']


# ------------------------------------------------------------------
# Single sample prediction
# ------------------------------------------------------------------
def predict_single(ligase_smi, ligase_seq, target_smi, target_seq, linker_smi):
    ligase_ligand = mol2graph(ligase_smi, LIGAND_ATOM_TYPE)
    warhead = mol2graph(target_smi, LIGAND_ATOM_TYPE)
    linker = mol2graph(linker_smi, LIGAND_ATOM_TYPE)

    e3_ligase_emb = ESM.embed_sequence(ligase_seq)
    target_emb = ESM.embed_sequence(target_seq)

    with torch.no_grad():
        logits, _, _ = MODEL(
            ligase_ligand.to(DEVICE),
            e3_ligase_emb.unsqueeze(0).to(DEVICE),
            warhead.to(DEVICE),
            target_emb.unsqueeze(0).to(DEVICE),
            linker.to(DEVICE),
        )

        probs = torch.softmax(logits, dim=1)
        score = probs[:, 1].item()
        pred = torch.argmax(probs, dim=1).item()

    return {
        "prediction":
            "Good Degrader"
            if pred == 1
            else "Bad Degrader",

        "class": pred,

        "degradation_score":
            round(score, 4)
    }

