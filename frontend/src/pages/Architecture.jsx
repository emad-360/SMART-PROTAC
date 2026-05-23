import GlassCard from '../components/GlassCard';
import { Cpu, Database, Layers, BarChart, Settings, Award, BookOpen, Network } from 'lucide-react';

function parseContent(content) {
  const lines = content.split('\n');
  const result = [];
  let inList = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      if (inList) {
        result.push('</ol>');
        inList = false;
      }
      result.push('<br />');
      continue;
    }

    // Check for numbered lists
    if (/^\d+\./.test(line)) {
      if (!inList) {
        result.push('<ol class="list-decimal list-inside ml-4 space-y-2">');
        inList = true;
      }
      const numberedContent = line.replace(/^\d+\.\s*/, '');
      result.push(`<li>${numberedContent}</li>`);
    } else {
      if (inList) {
        result.push('</ol>');
        inList = false;
      }
      // Bold text before colon
      const boldLine = line.replace(/^([^:]+):/g, '<strong>$1:</strong>');
      result.push(`<p class="mb-2">${boldLine}</p>`);
    }
  }

  if (inList) {
    result.push('</ol>');
  }

  return result.join('');
}

export default function Architecture() {
  const sections = [
    {
      icon: Network,
      title: 'Overview',
      content: `The SE3-PROTACs model, implemented using PyTorch and PyTorch Geometric, is designed to predict the degradation capabilities of PROTAC (Proteolysis Targeting Chimera) molecules. It integrates:

1. SE(3)-Transformer for equivariant 3D molecular graph representations,
2. ESM-2 embeddings for protein sequence encoding,
3. Interaction Gating Mechanism this mechanism is for modeling interactions between PROTAC components and proteins in the POI-PROTAC-E3 ternary complex.

This architecture supports binary classification of PROTAC-induced degradation.`
    },
    {
      icon: Cpu,
      title: 'Architecture Diagram',
      content: '',
      image: true
    },
    {
      icon: Layers,
      title: 'Components in Architecture',
      content: `I. SE(3)-Transformer - PROTAC Representation:
                Purpose: Processes PROTAC components (warhead, linker, E3 ligand) as 3D molecular graphs from mol2 files
                Architecture:
                \u2022  Converts SMILES to 3D molecular graphs using RDKit.
                \u2022 SE(3)-Transformer layers ensure rotational and translational equivariance.
                \u2022 Outputs feature vectors for each PROTAC component.
                Details:
                \u2022 Equivariant to SE(3) transformations (rotations and translations).
                \u2022 Preserves geometric information of molecular structures.

                II. ESM-2 - Protein Representation:
                Purpose: Extracts features from protein FASTA sequences (POI and E3 ligase).
                Architecture:
                \u2022 Uses pre-trained ESM-2 language model for protein encoding.
                \u2022 Generates contextualized embeddings for each amino acid residue.
                \u2022 Produces fixed-dimensional protein representations.
                Details:
                \u2022 Captures long-range dependencies in protein sequences.
                \u2022 Transfer learning from large-scale protein databases.

                III. Interaction Gating Mechanism:
                Purpose: Models coordinated interactions between target protein, E3 ligase, and PROTAC molecule.
                Architecture:
                \u2022 Concatenates warhead, linker, and E3 ligand embeddings to form PROTAC vector.
                \u2022 Creates Target-PROTAC and Ligase-PROTAC interaction vectors.
                \u2022 Computes gating scores to dynamically adjust node embeddings.
                Details:
                \u2022 Enables bidirectional information exchange between interfaces.
                \u2022 Emphasizes atoms and residues most relevant for degradation.

                IV. Classifier:
                Purpose: Predicts binary degradation outcomes from ternary complex representations.
                Architecture:
                \u2022 Three-layer MLP with ReLU activation and dropout.
                \u2022 Processes aggregated interaction embeddings.
                \u2022 Final layer outputs binary classification (degrader vs. non-degrader).
                Details:
                \u2022 Trained using Cross-Entropy Loss.
                \u2022 Dropout, provides regularization to prevent overfitting.`
    },
    {
      icon: Database,
      title: 'Model Input and Output',
      content: `Inputs:
              I. E3 Ligase Ligand (.smi): SMILES string converted to 3D molecular graph (.mol2).
              II. E3 Ligase (.fa): FASTA amino acid sequence.
              III. Warhead/Target Ligand (.smi): SMILES string converted to 3D molecular graph (.mol2).
              IV. Target Protein/POI (.fa): FASTA amino acid sequence.
              V. Linker (.smi): SMILES string converted to 3D molecular graph (.mol2).
              Each structural input is processed as a 3D molecular graph with atom features, bond features, and spatial coordinates. Protein sequences are encoded using ESM-2 embeddings.
              
              Final Output:
              Binary label (0 or 1), indicating degradation capability:
                1: Degrader
                0: Non-degrader`
    },
    {
      icon: BarChart,
      title: 'Performance Metrics',
      content: `Validation Performance:
                \u2022 Accuracy: 76.26%
                \u2022 Precision: 64.08%
                \u2022 Recall: 86.84%
                \u2022 AUROC: 84.87%
                \u2022 AUPR: 79.24%

                Test Performance:
                \u2022 Accuracy: 75.25%
                \u2022 Precision: 68.09%
                \u2022 Recall: 77.11%
                \u2022 AUROC: 83.51%
                \u2022 AUPR: 76.71%`
    },
    {
      icon: Settings,
      title: 'Training Configuration',
      content: `Dataset:
                \u2022 PROTAC-DB: Source for PROTAC molecular structures and degradation data
                \u2022 UniProt: Source for protein FASTA sequences (POI and E3 ligase)
                Labeling Criteria:
                \u2022 Active (Label 1): PROTACs with DC₅₀ ≤ 100 nM and Dmax ≥ 80%
                \u2022 Inactive (Label 0): PROTACs with DC₅₀ > 100 nM or Dmax < 80%

                Training Settings:
                \u2022 Optimizer: Adam
                \u2022 Learning rate: Initially 0.0001
                \u2022 LR Scheduler: ReduceLROnPlateau (dynamically adjusts learning rate during training)
                \u2022 Epochs: Configurable (default in main.py)
                \u2022 Train/test split: 80% / 20%
                \u2022 Device: CUDA if available, else CPU`
    },
    {
      icon: Award,
      title: 'Key Results',
      content: `The SE(3)-Transformer's equivariant architecture effectively captures 3D molecular geometry and protein-PROTAC interactions, achieving strong performance in degradation prediction.`
    },
    {
      icon: BookOpen,
      title: 'References',
      content: `PROTAC-DB: http://cadd.zju.edu.cn/protacdb/
                UniProt: https://www.uniprot.org/
                Code Repository: https://github.com/drugparadigm/SE3-protacs`
    }
  ];

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-600">
            Architecture
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Explore the technical details of our SMART PROTAC model
          </p>
        </div>

        <div className="space-y-8">
          {sections.map((section, index) => (
            <GlassCard key={index} className="transform hover:scale-[1.02] transition-all duration-300">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-300/50">
                  <section.icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-gray-200">
                    {section.title}
                  </h2>
                  {section.image && (
                    <div className="mb-4 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-8 flex items-center justify-center min-h-[200px] dark:from-purple-900/50 dark:to-purple-800/50">
                      <div className="text-center">
                        <img src="public/images/architecture.png" alt="Architecture Diagram" className="w-full h-auto" />
                      </div>
                    </div>
                  )}
                  <div 
                    className="text-gray-700 leading-relaxed dark:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: parseContent(section.content) }}
                  />
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
}
