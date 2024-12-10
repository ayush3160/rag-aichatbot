// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import styles from './index.css?inline'; 
const id = "jeemagent-shopify";
let root: ReactDOM.Root| null = null;

declare global {
  interface Window {
    cl_shadowRootElement: HTMLDivElement;
    mountJeemagent: ({projectId} : {projectId : string}) => void;
    unmountJeemagent: () => void;
    cl_chatbotId: string;
  }
}

window.mountJeemagent = ({projectId} : {projectId : string}) => {
  const container = document.createElement("div");
  container.id = id;
  document.body.appendChild(container);

  const shadowContainer = container.attachShadow({ mode: "open" });
  const shadowRootElement = document.createElement("div");
  shadowRootElement.id = "cl-shadow-root";

  // Inject Tailwind styles into shadow DOM
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  shadowContainer.appendChild(styleSheet);
  
  shadowContainer.appendChild(shadowRootElement);
  window.cl_shadowRootElement = shadowRootElement;

  root = ReactDOM.createRoot(shadowRootElement);
  root.render(
    <React.StrictMode>
      <App projectId={projectId} />
    </React.StrictMode>
  );
};

window.unmountJeemagent = () => {
  root?.unmount();
};