import React from "react";
import MatchCard from "./MatchCard";
import { IMatch } from "../../interfaces/match";

function Predictions() {
  const [matches, setMatches] = React.useState<IMatch | any>(null);

  console.log("match data", matches);

  function getNextSunday(date: any) {
    let today = new Date(date.getTime());
    let currentDayOfWeek = today.getDay();
    let daysUntilSunday = currentDayOfWeek === 0 ? 7 : 7 - currentDayOfWeek;
    today.setDate(today.getDate() + daysUntilSunday);
    return today.toLocaleDateString();
  }

  function getLastSunday(date: any) {
    let today = new Date(date.getTime());
    let currentDayOfWeek = today.getDay();
    let daysSinceSunday = currentDayOfWeek === 0 ? 7 : 0 - currentDayOfWeek;
    today.setDate(today.getDate() + daysSinceSunday);
    return today.toLocaleDateString();
  }

  const todaysDate = new Date();
  const nextSunday = getNextSunday(todaysDate);
  const lastSunday = getLastSunday(todaysDate);

  function checkDates(matchDate: any, lastSunday: any, nextSunday: any) {
    return matchDate >= lastSunday && matchDate <= nextSunday;
  }

  React.useEffect(() => {
    async function fetchMatches() {
      const resp = await fetch("/api/new/matches");
      const data = await resp.json();
      const filtered_data = data.filter((match: any) =>
        checkDates(
          new Date(match.date).toLocaleDateString(),
          lastSunday,
          nextSunday
        )
      );
      setMatches(filtered_data);
    }
    fetchMatches();
  }, []);

  return (
    <section className="container">
      <div className="predictions">
        <div>PREDICTIONS</div>
        <div>
          {matches?.map((match: IMatch, i: any) => {
            return <MatchCard key={i} {...match} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Predictions;
