import React from "react";

function MatchScores({ match, predictions, selected, user }: any) {

  return (
    <div className="max-w-lg rounded overflow-hidden shadow-lg mx-auto my-5">
      <p className="text-center text-xs">
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
      <div className="flex justify-evenly mt-2">
        <div className="inline font-bold text-l mb-2 text-center min-w-40 min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {match.team_one_name} <br />
          {predictions &&
            predictions
              .filter((prediction: any) => {
                return prediction.match.id === match.id;
              })
              .map((prediction: any) => {
                return (
                  <p>{prediction.team_one_score}</p>
                  // <CheckScoreOne
                  //   user={user}
                  //   predictions={predictions}
                  //   team_two_score_prediction={prediction.team_two_score}
                  //   team_two_score={match.team_two_score}
                  //   team_one_score_prediction={prediction.team_one_score}
                  //   team_one_score={match.team_one_score}
                  //   selected={selected}
                  //   team_one_name={match.team_one_name}
                  // />
                );
              })}
        </div>
        <div className="inline font-bold text-l mb-2 text-center min-w-40 min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold">
          {match.team_two_name}
          <br />
          {predictions &&
            predictions
              .filter((prediction: any) => {
                return prediction.match.id === match.id;
              })
              .map((prediction: any) => {
                return (
                  <p>{prediction.team_two_score}</p>
                  // <CheckScoreTwo
                  //   predictions={predictions}
                  //   team_two_score_prediction={prediction.team_two_score}
                  //   team_two_score={match.team_two_score}
                  //   team_one_score_prediction={prediction.team_one_score}
                  //   team_one_score={match.team_one_score}
                  //   selected={selected}
                  // />
                );
              })}
        </div>
      </div>
    </div>
  );
}

export default MatchScores;
