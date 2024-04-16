import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Predictions from "./components/Predictions";
import "./styles/index.css"

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predictions" element={<Predictions />} />
        </Routes>
      </Router>
      <div className="bg-blue-500 p-4">
        <p className="text-lg font-bold text-yellow-500">This is a</p>
        <p className="text-2xl font-extrabold text-green-500">multi-colored</p>
        <p className="text-sm font-semibold text-purple-500">sentence</p>
        <p className="text-base font-medium text-red-500">to test</p>
        <p className="text-xl font-semibold text-blue-500">Tailwind CSS</p>
        <p className="text-lg font-bold text-indigo-500">styles</p>
      </div>
    </>
  );
}

export default App;
