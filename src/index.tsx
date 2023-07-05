import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline } from "@mui/material";
import {
  ThemeProvider,
  createTheme,
  Experimental_CssVarsProvider as CssVarsProvider,
} from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssVarsProvider>
        <CssBaseline />
        <App />
      </CssVarsProvider>
    </ThemeProvider>
  );
};

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);

reportWebVitals();
