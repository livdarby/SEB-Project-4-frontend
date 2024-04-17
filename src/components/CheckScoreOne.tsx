import React from "react";
import axios from "axios";

function CheckScoreOne({
  predictions,
  team_two_score,
  team_two_score_prediction,
  team_one_score,
  team_one_score_prediction,
  user,
}: any) {
  const [backgroundColour, setBackgroundColour] = React.useState("");
  const [userScore, setUserScore] = React.useState<any>(0);
  let updatedScore = userScore;
  const token = localStorage.getItem("token");

  function checkScore() {
    if (
      team_one_score_prediction === team_one_score &&
      team_two_score_prediction === team_two_score
    ) {
      setBackgroundColour("bg-green-500");
      updatedScore += 3;
    } else if (
      (team_one_score_prediction - team_two_score_prediction) *
        (team_one_score - team_two_score) >
      0
    ) {
      setBackgroundColour("bg-amber-300");
      updatedScore += 1;
    } else {
      setBackgroundColour("bg-rose-300");
    }
    // setUserScore(updatedScore);
  }

  async function updateScore() {
    try {
      await axios.put(
        `/api/user/${user.id}`,
        { total_score: userScore },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    checkScore();
    // updateScore();
  }, []);

  React.useEffect(() => {
    setUserScore(updatedScore);
    updateScore();
  }, [checkScore]);

  return (
    <div className={backgroundColour + " max-w-40 "}>
      {team_one_score_prediction}
    </div>
  );
}

export default CheckScoreOne;
