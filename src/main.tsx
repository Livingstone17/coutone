
import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";
import { ThemeProvider } from "./contexts/ThemesContext"; // 👈 Add this

createRoot(document.getElementById("root")!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
);