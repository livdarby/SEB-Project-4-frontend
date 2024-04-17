import React from "react";

function PredictionScores({ prediction, match, selected }: any) {
  console.log("Prediction: ", prediction);
  console.log("Match: ", match);

  const [backgroundColour, setBackgroundColour] = React.useState("");
  console.log(backgroundColour);
  function checkScores() {
    if (
      prediction.team_one_score === match.team_one_score &&
      prediction.team_two_score === match.team_two_score
    ) {
      setBackgroundColour("bg-green-400");
    } else if (
      (prediction.team_one_score > prediction.team_two_score &&
        match.team_one_score > match.team_two_score) ||
      (prediction.team_one_score < prediction.team_two_score &&
        match.team_one_score < match.team_two_score) ||
      (prediction.team_one_score === prediction.team_two_score &&
        match.team_one_score === match.team_two_score)
    ) {
      setBackgroundColour("bg-amber-200");
    } else {
      setBackgroundColour("bg-rose-200");
    }
  }

  React.useEffect(() => {
    checkScores();
  }, [selected]);

  return (
    <div className={"flex justify-between " + backgroundColour}>
      <div>
        <p>{prediction.team_one_name}</p>
        <p>{prediction.team_one_score}</p>
      </div>
      <div>
        <p>{prediction.team_two_name}</p>
        <p>{prediction.team_two_score}</p>
      </div>
    </div>
  );
}

export default PredictionScores;
