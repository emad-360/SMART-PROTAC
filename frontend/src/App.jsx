import { useState } from "react"
import api from "./api"

export default function App() {
  const [files, setFiles] = useState({})
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function updateFile(name, file) {
    setFiles((prev) => ({
      ...prev,
      [name]: file
    }))
  }

  async function predict() {
    try {
      setLoading(true)

      const form = new FormData()

      Object.entries(files).forEach(([k, v]) => {
        form.append(k, v)
      })

      const res = await api.post(
        "/predict",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      )

      setResult(res.data)

    } catch (err) {
      alert("Prediction failed")

    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        padding: 40,
        maxWidth: 800,
        margin: "auto"
      }}
    >
      <h1>SMART PROTAC</h1>

      <FileInput
        label="Ligase SMILES"
        name="ligase_smi"
        onChange={updateFile}
      />

      <FileInput
        label="Ligase FASTA"
        name="ligase_fa"
        onChange={updateFile}
      />

      <FileInput
        label="Target SMILES"
        name="target_smi"
        onChange={updateFile}
      />

      <FileInput
        label="Target FASTA"
        name="target_fa"
        onChange={updateFile}
      />

      <FileInput
        label="Linker SMILES"
        name="linker_smi"
        onChange={updateFile}
      />

      <button
        onClick={predict}
        disabled={loading}
      >
        {loading ? "Predicting..." : "Run Prediction"}
      </button>

      {result && (
        <div>
          <h2>Result</h2>

          <p>
            Prediction: {result.prediction}
          </p>

          <p>
            Score: {result.degradation_score}
          </p>
        </div>
      )}
    </div>
  )
}


function FileInput({
  label,
  name,
  onChange
}) {
  return (
    <div
      style={{
        marginBottom: 20
      }}
    >
      <label>{label}</label>

      <br />

      <input
        type="file"
        onChange={(e) =>
          onChange(
            name,
            e.target.files[0]
          )
        }
      />
    </div>
  )
}