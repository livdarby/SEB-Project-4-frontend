import React from "react";
import MatchCard from "./MatchCard";
import { IMatch } from "../../interfaces/match";

function Predictions() {
  const [matches, setMatches] = React.useState<IMatch | any>(null);

  const premierLeagueClubs = [
    "Arsenal",
    "Aston Villa",
    "Bournemouth",
    "Brentford",
    "Brighton & Hove Albion",
    "Burnley",
    "Chelsea",
    "Crystal Palace",
    "Everton",
    "Fulham",
    "Liverpool",
    "Luton Town",
    "Manchester City",
    "Manchester United",
    "Newcastle United",
    "Nottingham Forest",
    "Sheffield United",
    "Tottenham Hotspur",
    "West Ham United",
    "Wolverhampton Wanderers",
  ];

  let clubsToRender = [] as any;
  let clubsFetched = 0;

  async function fetchMatches() {
    for (const club of premierLeagueClubs) {
      const resp = await fetch(`/api/new/matches/${club}`);
      const data = await resp.json();
      const filtered_data = data.filter((match: any) =>
        checkDates(
          new Date(match.date).toLocaleDateString(),
          lastSunday,
          nextSunday
        )
      );
      clubsToRender = [...clubsToRender, ...filtered_data];
      clubsFetched++;
      if (clubsFetched === premierLeagueClubs.length) {
        setMatches(clubsToRender);
      }
    }
  }

  React.useEffect(() => {
    fetchMatches();
  }, []);

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
    return matchDate > lastSunday && matchDate <= nextSunday;
  }

  return (
    <section className="container">
      <div className="predictions">
        <div>PREDICTIONS</div>
        <div>
          {!matches && <p>Loading...</p>}
          {matches?.map((match: IMatch, i: any) => {
            return <MatchCard key={i} {...match} />;
          })}
        </div>
      </div>
    </section>
  );
}

export default Predictions;
