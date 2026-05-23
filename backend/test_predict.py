from inference import predict_single
from preprocess import read_fasta
from preprocess import read_smi


result = predict_single(

    ligase_smi=
    read_smi(
        "casestudy/e3_ligase_ligand.smi"
    ),

    ligase_seq=
    read_fasta(
        "casestudy/e3_ligase.fa"
    ),

    target_smi=
    read_smi(
        "casestudy/warhead.smi"
    ),

    target_seq=
    read_fasta(
        "casestudy/target.fa"
    ),

    linker_smi=
    read_smi(
        "casestudy/linker.smi"
    )

)

print(result)