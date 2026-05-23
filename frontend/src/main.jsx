import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { DarkModeProvider } from "./contexts/DarkModeContext"
import "./styles/index.css"
import App from "./App"

ReactDOM
.createRoot(
document.getElementById("root")
)
.render(
<React.StrictMode>
  <DarkModeProvider>
    <BrowserRouter>
      <div className="watermark"></div>
      <App />
    </BrowserRouter>
  </DarkModeProvider>
</React.StrictMode>
)