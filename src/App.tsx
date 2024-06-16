import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Predictions from "./components/Predictions";
import SignIn from "./components/SignIn";
import "./styles/index.css";
import axios from "axios";
import SignUp from "./components/SignUp";
import Results from "./components/Results";
import Leaderboard from "./components/Leaderboard";
import { baseUrl } from "./config";
import PostMatches from "./components/PostMatches";
import ScoreUpdate from "./components/ScoreUpdate";
import Euros from "./components/Euros";
import EuroResults from "./components/EuroResults";
import EditPrediction from "./components/EditPrediction";

function App() {
  const [user, setUser] = React.useState(null);

  console.log("Current user: ", user);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) fetchUser();
  }, []);

  async function fetchUser() {
    const token = localStorage.getItem("token");
    const resp = await axios.get(`${baseUrl}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(resp.data);
  }

  return (
    <>
      <Router>
        <Navbar user={user} setUser={setUser} />
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/predictions" element={<Predictions user={user} />} />
          <Route path="/euros" element = {<Euros user={user}/>}/>
          <Route path="/eurosresults" element = {<EuroResults user={user}/>}/>
          <Route path="/results" element={<Results user={user} />} />
          <Route path="/leaderboard" element={<Leaderboard user={user} />} />
          <Route path="/signin" element={<SignIn fetchUser={fetchUser} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/matches" element={<PostMatches user={user} />} />
          <Route path="/scoreupdate" element={<ScoreUpdate user={user} />} />
          <Route path="/editprediction" element={<EditPrediction user={user} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
