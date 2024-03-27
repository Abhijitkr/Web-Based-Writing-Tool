import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { ConfigProvider } from "antd";
import GlobalProvider from "./state/GlobalContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "black",
        },
      }}
    >
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ConfigProvider>
  </React.StrictMode>
);
