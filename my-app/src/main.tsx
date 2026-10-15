import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Theme from "./styles/Theme";
import Router from "./application/Router";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={Theme}>
    <CssBaseline />
    <Router />
  </ThemeProvider>,
);
