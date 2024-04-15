import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import React from "react"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Predictions from "./components/Predictions"

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/predictions" element={<Predictions/>} />
      </Routes>
    </Router>
  )
}

export default App
