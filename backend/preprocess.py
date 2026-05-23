import torch
import numpy as np
from torch_geometric.data import Data
from torch_geometric.utils import to_scipy_sparse_matrix
from utils import smiles2mol2

EDGE_ATTR = {'1': 1, '2': 2, '3': 3, 'ar': 4, 'am': 5}

def mol2graph(smiles, ATOM_TYPE):
    mol2_str = smiles2mol2(smiles)
    lines = mol2_str.splitlines(keepends=True)

    try:
        atom_end_line = lines.index('@<TRIPOS>UNITY_ATOM_ATTR\n')
    except ValueError:
        atom_end_line = lines.index('@<TRIPOS>BOND\n')

    atom_lines = lines[lines.index('@<TRIPOS>ATOM\n') + 1:atom_end_line]
    bond_lines = lines[lines.index('@<TRIPOS>BOND\n') + 1:]

    atoms, positions = [], []
    for atom in atom_lines:
        parts = atom.split()
        ele = parts[5].split('.')[0]
        atoms.append(ATOM_TYPE.index(ele) if ele in ATOM_TYPE else len(ATOM_TYPE))
        positions.append([float(parts[2]), float(parts[3]), float(parts[4])])

    edge_1 = [int(i.split()[1]) - 1 for i in bond_lines]
    edge_2 = [int(i.split()[2]) - 1 for i in bond_lines]
    edge_attr = [EDGE_ATTR[i.split()[3]] for i in bond_lines]

    x = torch.tensor(atoms, dtype=torch.long)
    pos = torch.tensor(positions, dtype=torch.float)
    edge_idx = torch.tensor([edge_1 + edge_2, edge_2 + edge_1], dtype=torch.long)
    edge_attr = torch.tensor(edge_attr + edge_attr, dtype=torch.long)

    tdEdge = to_scipy_sparse_matrix(edge_idx, edge_attr).todense()
    tdEdge = torch.from_numpy(np.array(tdEdge, dtype=np.float32).flatten())

    return Data(x=x, pos=pos, edge=tdEdge)


def read_fasta(file_path):
    with open(file_path, "r") as f:
        lines = f.readlines()
    return "".join([l.strip() for l in lines if not l.startswith(">")])

def read_smi(file_path):
    with open(file_path, "r") as f:
        return f.readline().strip()