import { useState, useEffect } from "react";
import { baseUrl } from "../config";
import ResultPerPrediction from "./ResultPerPrediction";

function EuroResults({ user, league }: any) {
  const [userPredictions, setUserPredictions] = useState<any>(null);
  const token = localStorage.getItem("token");

  async function getUserPredictions(id: any) {
    const resp = await fetch(`${baseUrl}/predictions/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const euroPredictions = data.filter((prediction: any) => {
      if (league === "Euros") {
        return (
          prediction.match.tournament === "Euros" &&
          typeof prediction.match.team_one_score === "number" &&
          typeof prediction.match.team_two_score === "number"
        );
      } else if (league === "premierleague") {
        return (
          prediction.match.tournament === "Premier League" &&
          typeof prediction.match.team_one_score === "number" &&
          typeof prediction.match.team_two_score === "number"
        );
      }
    });
    const sortedByDate = euroPredictions.sort(
      (a: any, b: any) =>
        new Date(a.match.match_date).getTime() -
        new Date(b.match.match_date).getTime()
    );
    setUserPredictions(sortedByDate);
  }

  useEffect(() => {
    if (user) {
      getUserPredictions(user.id);
    }
  }, []);

  return (
    <>
      <div>
        <h1 className="font-marker text-center text-[#1884ef] text-3xl tracking-widest my-10">
          Results
        </h1>
        {userPredictions &&
          userPredictions.map((prediction: any) => {
            return <ResultPerPrediction key={prediction.id} {...prediction} />;
          })}
      </div>
    </>
  );
}

export default EuroResults;
