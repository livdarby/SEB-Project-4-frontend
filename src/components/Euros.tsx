import { baseUrl } from "../config";
import { useEffect, useState } from "react";
import EuroMatchCard from "./EuroMatchCard";

function Euros({ user, league }: any) {
  const [matches, setMatches] = useState<any>(null);

  async function getMatches() {
    const resp = await fetch(`${baseUrl}/matches`);
    const data = await resp.json();
    const filteredData = data.filter((match: any) => {
      if (league === "euros") {
        return match.tournament === "Euros";
      } else if (league === "premierleague") {
        return match.tournament === "Premier League";
      }
    });

    const arrayWithTimeObject = filteredData.map((match: any) => {
      return { ...match, ...{ dateObject: new Date(match.match_date) } };
    });
    const upcomingMatches = arrayWithTimeObject.filter((match: any) => {
      return (
        match.dateObject >= new Date() ||
        (match.dateObject.getDate() === new Date().getDate() &&
          match.dateObject.getMonth() === new Date().getMonth())
      );
    });

    upcomingMatches.map((match: any) => {
      return (match.match_date = new Date(match.match_date));
    });
    upcomingMatches.sort(
      (a: any, b: any) => a.match_date.getTime() - b.match_date.getTime()
    );
    setMatches(upcomingMatches);
  }

  useEffect(() => {
    getMatches();
  }, [league]);

  return (
    <>
      {" "}
      <div className="flex justify-center flex-wrap grid-cols-2 w-full">
        {matches?.map((match: any) => {
          return <EuroMatchCard key={match.id} {...match} user={user} />;
        })}
      </div>
      
    </>
  );
}

export default Euros;
