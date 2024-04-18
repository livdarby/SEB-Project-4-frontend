import React from "react";
import MemberPoints from "./MemberPoints";

function PredictionScores({ prediction, match, selected, user, sendDataToParent }: any) {
  const [dataFromMemberPoints, setDataFromMemberPoints] = React.useState(null);
  const [backgroundColour, setBackgroundColour] = React.useState("");

  const handleDataFromMemberPoints = (data: any) => {
    setDataFromMemberPoints(data);
  };

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
      setBackgroundColour("bg-amber-300");
    } else {
      setBackgroundColour("bg-rose-300");
    }
  }

  React.useEffect(() => {
    checkScores();
  }, [selected]);


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
        <MemberPoints
          backgroundColour={backgroundColour}
          user={user}
          match={match}
          sendDataToParent={handleDataFromMemberPoints}
        />
      </div>
      <div>Points : {dataFromMemberPoints}</div>
    </>
  );
}

export default PredictionScores;
