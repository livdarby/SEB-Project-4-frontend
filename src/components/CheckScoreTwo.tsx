import React from "react";

function CheckScoreTwo({
  predictions,
  team_two_score,
  team_two_score_prediction,
  team_one_score,
  team_one_score_prediction,
}: any) {
  const [backgroundColour, setBackgroundColour] = React.useState("");

  function checkScore() {
    if (
      team_one_score_prediction === team_one_score &&
      team_two_score_prediction === team_two_score
    ) {
      setBackgroundColour("bg-green-500");
    } else if (
      (team_one_score_prediction - team_two_score_prediction) *
        (team_one_score - team_two_score) >
      0
    ) {
      setBackgroundColour("bg-amber-300");
    } else {
      setBackgroundColour("bg-rose-300");
    }
  }

  React.useEffect(() => {
    checkScore();
  }, []);

  return (
    <div className={backgroundColour + " max-w-40"}>
      {team_two_score_prediction}
    </div>
  );
}

export default CheckScoreTwo;
