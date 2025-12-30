import { createRoot } from "react-dom/client";
console.log("Main.tsx executing...");
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
