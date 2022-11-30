import React from "react";
import AppBar from "./components/AppBar.js";
import Converter from "./components/Converter.js";
import Page404 from "./components/Page404.js";
import "./css/App.css";
import { Routes, Route, Navigate } from "react-router-dom";

const App = () => (
  <div className="App">
    <header>
      <AppBar />
    </header>

    <main>
      <Routes>
        <Route path="/" element={<Converter />} />
        <Route path="/with404" element={<Converter prop="404" />} />
        <Route path="/404" element={<Page404 />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </main>
  </div>
);

export default App;
