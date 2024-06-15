import { useEffect, useState } from "react";

function ResultPerPrediction({
  id,
  team_one_name,
  team_two_name,
  team_one_score,
  team_two_score,
  match,
}: any) {
  const [backgroundColour, setBackgroundColour] = useState<any>(null);
  const [points, setPoints] = useState<any>(null);

  function checkPredictions() {
    if (
      team_one_score === match.team_one_score &&
      team_two_score === match.team_two_score
    ) {
      setBackgroundColour("bg-green-400");
      setPoints(3)
    } else if (
      team_one_score === team_two_score &&
      match.team_one_score === match.team_two_score
    ) {
      setBackgroundColour("bg-amber-300");
      setPoints(1)
    } else if (
      team_one_score > team_two_score &&
      match.team_one_score > match.team_two_score
    ) {
      setBackgroundColour("bg-amber-300");
      setPoints(1)
    } else if (
      team_one_score < team_two_score &&
      match.team_one_score < match.team_two_score
    ) {
      setBackgroundColour("bg-amber-300");
      setPoints(1)
    } else {
      setBackgroundColour("bg-rose-300");
      setPoints(0)
    }
  }

  useEffect(() => {
    checkPredictions();
  }, []);

  return (
    <div className="my-5 border flex justify-center flex-wrap max-w-[50%] mx-auto py-2 rounded shadow">
        <p className="text-xs font-semibold text-gray-700 mb-2">{match.match_date}</p>
      <h1 className="w-[100%] text-center uppercase text-sm font-semibold text-gray-700 mb-2">
        Match Result
      </h1>
      <div className="flex flex-col text-center w-[30%] uppercase text-sm font-semibold text-gray-700">
        <h1 className="mb-2">{team_one_name}</h1>
        <p>{match.team_one_score}</p>
      </div>
      <div className="text-center w-[10%] uppercase text-sm font-semibold text-gray-700">
        v
      </div>
      <div className="flex flex-col text-center w-[30%] uppercase text-sm font-semibold text-gray-700">
        <h1 className="mb-2">{team_two_name}</h1>
        <p>{match.team_two_score}</p>
      </div>
      <h1 className="w-[100%] text-center uppercase text-sm font-semibold text-gray-700 mb-2">
        Your Prediction
      </h1>
      <div
        className={
          "flex flex-col text-center w-[30%] uppercase text-sm font-semibold text-gray-700 " +
          backgroundColour
        }
      >
        <p>{team_one_score}</p>
      </div>
      <div className={"text-center w-[10%] uppercase text-sm font-semibold text-gray-700 " + backgroundColour} ></div>
      <div className={"flex flex-col text-center w-[30%] uppercase text-sm font-semibold text-gray-700 " + backgroundColour} >
        <p>{team_two_score}</p>
      </div>
      <p className={"uppercase text-sm font-semibold text-gray-700 tracking-wide w-[100%] text-center mt-2 "}>Points : {points}</p>
    </div>
  );
}

export default ResultPerPrediction;
