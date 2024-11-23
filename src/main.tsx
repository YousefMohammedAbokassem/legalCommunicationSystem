import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./css/index.scss";
import "./i18.tsx";
import { Provider } from "react-redux";
import store from "./store/store";
import Container from "./components/Container.tsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    primary: {
      main: "#1d4c6a",
    },
  },
});
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Container />
    </ThemeProvider>
  </Provider>
);
