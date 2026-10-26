import { createRoot } from "react-dom/client";

// Fontes do site original, servidas pelo próprio site (sem depender do Google Fonts — mais rápido e melhor para a LGPD)
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/eb-garamond/600.css";
import "@fontsource/eb-garamond/700.css";
import "@fontsource/eb-garamond/400-italic.css";
import "@fontsource/lato/300.css";
import "@fontsource/lato/400.css";
import "@fontsource/lato/400-italic.css";
import "@fontsource/lato/700.css";
import "@fontsource/lato/900.css";
import "@fontsource/actor/400.css";

import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
