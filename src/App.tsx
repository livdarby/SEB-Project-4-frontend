import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Predictions from "./components/Predictions";
import SignIn from "./components/SignIn";
import "./styles/index.css";
import axios from "axios";
import SignUp from "./components/SignUp";

function App() {
  const [user, setUser] = React.useState(null);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    const resp = await axios.get("/api/user", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(resp.data);
  }

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, []);

  console.log("Current user: ", user);

  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predictions" element={<Predictions />} />
          <Route path="/signin" element={<SignIn fetchUser={fetchUser} />} />
          <Route path="/signup" element ={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
