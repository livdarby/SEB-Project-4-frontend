import React from "react";
import CheckScoreTwo from "./CheckScoreTwo";
import CheckScoreOne from "./CheckScoreOne";

function Week33({ user }: any) {
  const [matches, setMatches] = React.useState<any>(null);
  const [predictions, setPredictions] = React.useState<any>(null);
  const week33Start = new Date("Sat, 13 Apr 2024");
  const week33End = new Date("Tue, 16 Apr 2024");
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    getLastWeekMatches();
    findPredictionByUser();
  }, []);

  async function getLastWeekMatches() {
    const resp = await fetch("/api/matches");
    const data = await resp.json();
    const filtered_data = data.filter((match: any) => {
      const matchDate = new Date(match.match_date);
      return matchDate >= week33Start && matchDate <= week33End;
    });
    setMatches(filtered_data);
  }

  async function findPredictionByUser() {
    const resp = await fetch(`/api/predictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setPredictions(data);
  }

  return (
    <form>
      {!matches && <p>Loading results...</p>}
      {matches &&
        matches.map((match: any) => {
          return (
            <div>
              <div className="max-w-lg rounded overflow-hidden shadow-lg mx-auto my-5">
                {/* <img
                  className="w-full"
                  src="/img/card-top.jpg"
                  alt="Sunset in the mountains"
                /> */}
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
                            <CheckScoreOne
                              user={user}
                              predictions={predictions}
                              team_two_score_prediction={
                                prediction.team_two_score
                              }
                              team_two_score={match.team_two_score}
                              team_one_score_prediction={
                                prediction.team_one_score
                              }
                              team_one_score={match.team_one_score}
                            />
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
                            <CheckScoreTwo
                              predictions={predictions}
                              team_two_score_prediction={
                                prediction.team_two_score
                              }
                              team_two_score={match.team_two_score}
                              team_one_score_prediction={
                                prediction.team_one_score
                              }
                              team_one_score={match.team_one_score}
                            />
                          );
                        })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </form>
  );
}

export default Week33;
