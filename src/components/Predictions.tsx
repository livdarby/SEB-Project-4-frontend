import React from "react";
import MatchCard from "./MatchCard";
import { IMatch, IDatabaseMatch } from "../../interfaces/match";
import axios from "axios";

function Predictions({ user }: any) {
  const [matches, setMatches] = React.useState<IMatch | any>(null);
  const [areMatchesPosted, setAreMatchesPosted] = React.useState(false);
  const [databaseMatches, setDatabaseMatches] = React.useState<
    IDatabaseMatch | any
  >(null);
  const [areDatabaseMatchesFetched, setAreDatabaseMatchesFetched] =
    React.useState(false);

  const todaysDate = new Date();
  const nextSunday = getNextSunday(todaysDate);
  const lastSunday = getLastSunday(todaysDate);
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

  console.log("match data", matches);

  // async function fetchMatches() {
  //   for (const club of premierLeagueClubs) {
  //     const resp = await fetch(`/api/new/matches/${club}`);
  //     const data = await resp.json();
  //     const filtered_data = data.filter((match: any) =>
  //       checkDates(
  //         new Date(match.date).toLocaleDateString(),
  //         lastSunday,
  //         nextSunday
  //       )
  //     );
  //     clubsToRender = [...clubsToRender, ...filtered_data];
  //     clubsFetched++;
  //     if (clubsFetched === premierLeagueClubs.length) {
  //       setMatches(clubsToRender);
  //     }
  //   }
  // }

  // Commenting this out to save api searches ^

  React.useEffect(() => {
    getDabaseMatches();
  }, []);

  async function getDabaseMatches() {
    const resp = await fetch("/api/matches");
    const data = await resp.json();
    console.log(data);
    setDatabaseMatches(data);
  }

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

  function checkDates(matchDate: any, lastSunday: any, nextSunday: any) {
    return matchDate > lastSunday && matchDate <= nextSunday;
  }

  if (matches && !areMatchesPosted) {
    async function postMatches() {
      const resp = await axios.post("/api/matches", matches);
    }
    postMatches();
    setAreMatchesPosted(true);
  }

  if (/* areMatchesPosted  && */ !areDatabaseMatchesFetched) {
    getDabaseMatches();
    setAreDatabaseMatchesFetched(true);
  }

  return (
    <section className="flex justify-center text-center">
      <div className="w-full mx-auto">
        <h1 className="text-2xl tracking-wide my-10">PREDICTIONS</h1>
        <div className="flex justify-center flex-wrap grid-cols-2 w-full">
          {!databaseMatches && <p>Loading...</p>}
          {databaseMatches
            ?.filter((match: any) => {
              return !match.match_date.includes("Mar") && match.id !== 1;
            })
            .map((databaseMatch: IDatabaseMatch) => {
              return (
                <MatchCard
                  key={databaseMatch.id}
                  {...databaseMatch}
                  user={user}
                />
              );
            })}
        </div>
      </div>
    </section>
  );
}

export default Predictions;
