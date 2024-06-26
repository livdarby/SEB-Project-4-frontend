import React from "react";
import MatchScores from "./MatchScores";
import { baseUrl } from "../config";

function MatchWeek({
  user,
  selected,
  userPoints,
  dataRendered,
  setDataRendered,
}: any) {
  const [matches, setMatches] = React.useState<any>(null);
  const [predictions, setPredictions] = React.useState<any>(null);
  const week33Start = new Date("Sat, 13 Apr 2024");
  const week33End = new Date("Tue, 16 Apr 2024");
  const token = localStorage.getItem("token");
  const week32Start = new Date("Fri, 5 Apr 2024");
  const week32End = new Date("Mon, 8 Apr 2024");
  const week34Start = new Date("Fri, 20 Apr 2024");
  const week34End = new Date("Mon, 22 Apr 2024");
  // console.log(predictions);
  const currentUser = user;
  const [areMatchesRendered, setAreMatchesRendered] = React.useState(false);
  // console.log(selected);
  // console.log(matches);
  // console.log(predictions);

  React.useEffect(() => {
    getLastWeekMatches();
    findPredictionByUser();
    setDataRendered(true);
  }, [!dataRendered]);

  async function getLastWeekMatches() {
    const resp = await fetch(`${baseUrl}/matches`);
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
      const filtered_data = data.filter((match: any) => {
        const matchDate = new Date(match.match_date);
        return matchDate >= week34Start && matchDate <= week34End;
      });
      setMatches(filtered_data);
    } else if ([29, 35, 36, 37, 38].includes(selected)) {
      setMatches(null);
    }
  }

  async function findPredictionByUser() {
    const resp = await fetch(`${baseUrl}/predictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    // console.log(data);
    setPredictions(data);
  }

  return (
    <form className="bg-[#d3ecfb] min-h-screen">
      <h1 className="text-center text-3xl tracking-wide py-10 font-marker tracking-widest text-[#1884ef]">
        RESULTS
      </h1>
      <p className="uppercase tracking-wide text-gray-700 text-xs font-bold text-center">
        Running total: {userPoints}
      </p>
      {!matches && ![29, 35, 36, 37, 38].includes(selected) && (
        <p className="text-center h-screen">Loading results...</p>
      )}
      {!matches && [29].includes(selected) && (
        <p className="text-center mt-10 uppercase text-xs font-bold tracking-wide text-gray-700">
          MW29 matches rescheduled due to postponements
        </p>
      )}
      {!matches && [29, 35, 36, 37, 38].includes(selected) && (
        <p className="text-center mt-10 uppercase text-xs font-bold tracking-wide text-gray-700">
          Check back for results
        </p>
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
