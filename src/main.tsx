import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./_utils/theme-provider.tsx";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="pw-theme">
      <App />
    </ThemeProvider>
  </StrictMode>,
);
