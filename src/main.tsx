import { createRoot } from "react-dom/client";
import App from "./app/App.tsx";
import "./styles/index.css";

console.log("🚀 main.tsx carregado");
console.log("📍 Root element:", document.getElementById("root"));

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("❌ Elemento #root não encontrado!");
  document.body.innerHTML = '<div style="color: red; padding: 20px; font-size: 24px;">ERRO: Elemento #root não encontrado</div>';
} else {
  console.log("✅ Root element encontrado, renderizando App...");
  try {
    createRoot(rootElement).render(<App />);
    console.log("✅ App renderizado com sucesso");
  } catch (error) {
    console.error("❌ Erro ao renderizar App:", error);
    document.body.innerHTML = `<div style="color: red; padding: 20px; font-size: 24px;">ERRO: ${error}</div>`;
  }
}