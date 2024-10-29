// Import Modules
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import ContextProvider from "./context/StoreContext.jsx";
import store from "./redux/store.js";
import { Provider as ProviderRedux } from "react-redux";

// Import File CSS
import "./index.css";

// Import Components
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ContextProvider>
    <ProviderRedux store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ProviderRedux>
  </ContextProvider>
  // </StrictMode>
);
