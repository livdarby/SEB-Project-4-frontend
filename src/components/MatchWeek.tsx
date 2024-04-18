import React from "react";
import MatchScores from "./MatchScores";

function MatchWeek({ user, selected, userPoints }: any) {
  const [matches, setMatches] = React.useState<any>(null);
  const [predictions, setPredictions] = React.useState<any>(null);
  const week33Start = new Date("Sat, 13 Apr 2024");
  const week33End = new Date("Tue, 16 Apr 2024");
  const token = localStorage.getItem("token");
  const week32Start = new Date("Fri, 5 Apr 2024");
  const week32End = new Date("Mon, 8 Apr 2024");
  // console.log(predictions);
  const currentUser = user;

  React.useEffect(() => {
    getLastWeekMatches();
    findPredictionByUser();
  }, [selected]);

  async function getLastWeekMatches() {
    const resp = await fetch("/api/matches");
    const data = await resp.json();
    if (selected === 33) {
      const filtered_data = data.filter((match: any) => {
        const matchDate = new Date(match.match_date);
        return matchDate >= week33Start && matchDate <= week33End;
      });
      setMatches(filtered_data);
    } else if (selected === 32) {
      const filtered_data = data.filter((match: any) => {
        const matchDate = new Date(match.match_date);
        return matchDate >= week32Start && matchDate <= week32End;
      });
      setMatches(filtered_data);
    } else if (selected === 34) {
      setMatches(null);
    }
  }

  async function findPredictionByUser() {
    const resp = await fetch(`/api/predictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setPredictions(data);
  }

  return (
    <form className="bg-[#d3ecfb]">
      <h1 className="text-center text-3xl tracking-wide py-10 font-marker tracking-widest text-[#1884ef]">
        RESULTS
      </h1>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold text-center">
        Running total: {userPoints}
      </p>
      {!matches && selected !== 34 && (
        <p className="text-center">Loading results...</p>
      )}
      {!matches && selected === 34 && (
        <p className="text-center">Check back next week for results</p>
      )}
      {matches &&
        matches.map((match: any) => {
          return (
            <div>
              <MatchScores
                match={match}
                predictions={predictions}
                selected={selected}
                user={currentUser}
              />
            </div>
          );
        })}
    </form>
  );
}

export default MatchWeek;
