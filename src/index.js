import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Info from "./components/Info/Info";
import Declined from "./components/Declined/Declined";
import { Upload } from "./components/upload";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/info" element={<Info/>} />
        <Route path="/declined" element={<Declined/>}/>
        <Route path="/upload" element={<Upload/>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
