import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./main.css";
import { QueryProvider } from "./app/providers/QueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <App />
  </QueryProvider>
);
