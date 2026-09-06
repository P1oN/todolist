import { createRoot } from "react-dom/client";
import { App } from "./components/App/App";
import init from "demo-registry-widget";

init({ baseUrl: "https://p1on.github.io/demo-registry/" });
createRoot(document.getElementById("root")).render(<App />);
