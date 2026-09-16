import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const container = document.getElementById("root")!;

// In production the page arrives already rendered (scripts/prerender.mjs), so
// React attaches to that markup. The development server has no prerendered
// markup to attach to, so it renders from scratch instead.
if (container.hasChildNodes()) {
  hydrateRoot(container, <App />);
} else {
  createRoot(container).render(<App />);
}
