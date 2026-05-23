import { useState } from 'react';
import api from '../api';
import FileInput from '../components/FileInput';
import Button from '../components/Button';
import GlassCard from '../components/GlassCard';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

export default function RunModel() {
  const [files, setFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  function updateFile(name, file) {
    setFiles((prev) => ({
      ...prev,
      [name]: file
    }));
    setError(null);
  }

  async function predict() {
    try {
      setLoading(true);
      setError(null);
      setResult(null);

      const form = new FormData();

      Object.entries(files).forEach(([k, v]) => {
        form.append(k, v);
      });

      const res = await api.post(
        "/predict",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setResult(res.data);

    } catch (err) {
      setError("Prediction failed. Please check your inputs and try again.");
      console.error(err);

    } finally {
      setLoading(false);
    }
  }

  const allFilesUploaded = Object.keys(files).length === 5;

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-600">
            Run Model
          </h1>
          <p className="text-gray-600 text-lg dark:text-gray-300">
            Upload your molecular data to get degradation predictions
          </p>
        </div>

        <GlassCard className="mb-8">
          <div className="space-y-8">
            <FileInput
              label="Target Sequence (.fa)"
              name="target_fa"
              onChange={updateFile}
              value={files.target_fa}
            />

            <FileInput
              label="E3 Ligase Sequence (.fa)"
              name="ligase_fa"
              onChange={updateFile}
              value={files.ligase_fa}
            />

            <FileInput
              label="Warhead SMILES (.smi)"
              name="target_smi"
              onChange={updateFile}
              value={files.target_smi}
            />

            <FileInput
              label="E3 Ligase Ligand SMILES (.smi)"
              name="ligase_smi"
              onChange={updateFile}
              value={files.ligase_smi}
            />

            <FileInput
              label="Linker SMILES (.smi)"
              name="linker_smi"
              onChange={updateFile}
              value={files.linker_smi}
            />

            <div className="pt-4">
              <Button
                onClick={predict}
                disabled={loading || !allFilesUploaded}
                className="w-full text-lg py-4"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 inline animate-spin" />
                    Predicting...
                  </>
                ) : (
                  'Run Prediction'
                )}
              </Button>
              {!allFilesUploaded && (
                <p className="text-sm text-gray-500 mt-2 text-center dark:text-gray-400">
                  Please upload all 5 files to proceed
                </p>
              )}
            </div>
          </div>
        </GlassCard>

        {error && (
          <GlassCard className="mb-8 border-red-200 bg-red-50/70 dark:border-red-500/30 dark:bg-red-900/30">
            <div className="flex items-center text-red-700 dark:text-red-400">
              <AlertCircle className="w-6 h-6 mr-3" />
              <p>{error}</p>
            </div>
          </GlassCard>
        )}

        {result && (
          <GlassCard className="border-green-200 bg-green-50/70 animate-fade-in dark:border-green-500/30 dark:bg-green-900/30">
            <div className="flex items-center mb-6">
              <CheckCircle className="w-8 h-8 text-green-600 mr-3 dark:text-green-400" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Prediction Result</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/60 rounded-xl p-6 dark:bg-gray-700/60">
                <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Prediction</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {result.prediction}
                </p>
              </div>

              <div className="bg-white/60 rounded-xl p-6 dark:bg-gray-700/60">
                <p className="text-sm text-gray-600 mb-2 dark:text-gray-400">Degradation Score</p>
                <p className="text-2xl font-bold text-purple-700 dark:text-purple-400">
                  {result.degradation_score}
                </p>
              </div>
            </div>
          </GlassCard>
        )}
      </div>
    </div>
  );
}
