import React from "react";
import MatchCard from "./MatchCard";
import { IMatch, IDatabaseMatch } from "../../interfaces/match";
import axios from "axios";
import { baseUrl } from "../config";

function Predictions({ user }: any) {
  const [matches, setMatches] = React.useState<IMatch | any>(null);
  const [areMatchesPosted, setAreMatchesPosted] = React.useState(false);
  const [databaseMatches, setDatabaseMatches] = React.useState<
    IDatabaseMatch | any
  >(null);
  const [areDatabaseMatchesFetched, setAreDatabaseMatchesFetched] =
    React.useState(false);
  const [selectedMatchWeek, setSelectedMatchWeek] = React.useState<any>(null);

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

  // console.log("match data", matches);

  async function fetchMatches() {
    for (const club of premierLeagueClubs) {
      const resp = await fetch(`${baseUrl}/new/matches/${club}`);
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

  // Commenting this out to save api searches ^

  // React.useEffect(() => {
  //   fetchMatches()
  // }, []);

  async function getDabaseMatches(selectedMatchWeek: Number) {
    const resp = await fetch(`${baseUrl}/matches`);
    const data = await resp.json();
    const filteredData = data.filter(
      (match: any) => match.match_week === selectedMatchWeek
    );
    console.log(selectedMatchWeek, filteredData);
    setDatabaseMatches(data);
    // const filtered_db_data = data.filter((match: any) => {
    //   return (
    //     new Date(match.match_date) > new Date("Mon, 6 May 2024") &&
    //     new Date(match.match_date) < new Date("Mon, 13 May 2024")
    //   );
    // });
    // setDatabaseMatches(filtered_db_data);
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

  function handleMatchWeekClick(e: any) {
    setSelectedMatchWeek(Number(e.target.value));
    setDatabaseMatches(null);
    getDabaseMatches(selectedMatchWeek);
  }

  if (matches && !areMatchesPosted) {
    async function postMatches() {
      const resp = await axios.post(`${baseUrl}/matches`, matches);
    }
    postMatches();
    setAreMatchesPosted(true);
  }

  if (/*areMatchesPosted  &&*/ !areDatabaseMatchesFetched) {
    getDabaseMatches(selectedMatchWeek);
    setAreDatabaseMatchesFetched(true);
  }

  return (
    <section
      className={"flex h-screen flex-col justify-center bg-[#d3ecfb] flex-wrap"}
    >
      <h1 className="font-marker text-center text-3xl text-[#1884ef] mb-2">
        Premier League Predictions League
      </h1>
      <p className="text-center tracking-wide font-title">
        returns in September. Check back soon!
      </p>
      {/* <div className="w-full mx-auto">
        <h1 className="text-3xl tracking-wide my-10 font-marker tracking-widest text-[#1884ef]">
          PREDICTIONS
        </h1>
        <label className="uppercase text-gray-800 text-s font-semibold tracking-wide">
          Select Match Week:
        </label>
        <br />
        <select
          onChange={handleMatchWeekClick}
          className="my-5"
          name="match-week"
          id="match-week"
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option>
          <option value="32">32</option>
          <option value="33">33</option>
          <option value="34">34</option>
          <option value="35">35</option>
          <option value="36">36</option>
          <option value="37">37</option>
          <option value="38">38</option>
        </select>

        <div className="flex justify-center flex-wrap grid-cols-2 w-full">
          {!databaseMatches && <p className="h-screen">Loading...</p>}
          {databaseMatches
            ?.filter((match: any) => {
              return match.match_week === selectedMatchWeek;
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
        {databaseMatches?.filter((match: any) => {
          return match.match_week === selectedMatchWeek;
        }).length === 0 && (
          <p className="h-screen uppercase text-gray-800 tracking-wide font-semibold text-xs my-5">
            No matches returned for this Match Week. Please select a different
            Match Week to continue.
          </p>
        )}
      </div> */}
    </section>
  );
}

export default Predictions;
