import React from "react";
import PredictionScores from "./PredictionScores";

function MatchScores({ match, predictions, selected, user }: any) {
  return (
    <div className="bg-white border-2 border-amber-500 max-w-lg rounded overflow-hidden shadow-lg mx-auto my-5 hover:bg-[#f7fcfe]">
      <p className="text-center text-xs my-4">
        {match.match_date.substring(
          0,
          match.match_date.indexOf("2024") + "2024".length
        )}
      </p>
      <p className="text-center min-h-10 block uppercase tracking-wide text-gray-700 text-s font-bold mt-2">
        RESULT:
      </p>
      <div className="flex justify-evenly mt-2">
        <div className="inline font-bold text-l mb-2 text-center min-w-40 min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {match.team_one_name} <br />
          {match.team_one_score}
        </div>
        <div className="inline font-bold text-l mb-2 text-center min-w-40 min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {match.team_two_name}
          <br />
          {match.team_two_score}
        </div>
      </div>
      <p className="text-center min-h-10 block uppercase tracking-wide text-gray-700 text-s font-bold mt-2">
        PREDICTION:
      </p>
      <div className="mt-2 ">
        <div className=" inline font-bold text-l mb-2 text-center min-w-40 min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {predictions &&
            predictions
              .filter((prediction: any) => {
                return prediction.match.id === match.id;
              })
              .map((prediction: any) => {
                return (
                  <PredictionScores
                    prediction={prediction}
                    match={match}
                    selected={match.id}
                  />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default MatchScores;
