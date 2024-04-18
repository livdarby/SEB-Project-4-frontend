import React from "react";
import axios from "axios";

function PredictionScores({ prediction, match, selected, user }: any) {
  const [backgroundColour, setBackgroundColour] = React.useState("");
  const [points, setPoints] = React.useState(null);
  const token = localStorage.getItem("token");

  async function checkPoints() {
    const resp = await fetch(`/api/predictionresult/${prediction.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setPoints(data.points);
  }

  React.useEffect(() => {
    checkPoints();
  }, []);

  function checkScores() {
    if (points === 3) {
      setBackgroundColour("bg-green-400");
    } else if (points === 1) {
      setBackgroundColour("bg-amber-300");
    } else {
      setBackgroundColour("bg-rose-300");
    }
  }

  React.useEffect(() => {
    checkScores();
  }, [points]);

  return (
    <>
      <div
        className={
          "flex justify-evenly border-4 border-white " + backgroundColour
        }
      >
        <div className="min-w-40 min-h-10 flex flex-col justify-center">
          <p>{prediction.team_one_name}</p>
          <p>{prediction.team_one_score}</p>
        </div>
        <div className="min-w-40 min-h-10 flex flex-col justify-center">
          <p>{prediction.team_two_name}</p>
          <p>{prediction.team_two_score}</p>
        </div>
      </div>
      <div>Points : {points}</div>
    </>
  );
}

export default PredictionScores;
