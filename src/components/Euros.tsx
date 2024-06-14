import { baseUrl } from "../config";
import { useEffect, useState } from "react";
import EuroMatchCard from "./EuroMatchCard";

function Euros({ user }: any) {
  const [matches, setMatches] = useState<any>(null);
  console.log(matches);

  async function getMatches() {
    const resp = await fetch(`${baseUrl}/matches`);
    const data = await resp.json();
    const filteredData = data.filter((match: any) => {
      return match.tournament === "Euros";
    });

    filteredData.map((match: any) => {
      return (match.match_date = new Date(match.match_date));
    });
    filteredData.sort(
      (a: any, b: any) => a.match_date.getTime() - b.match_date.getTime()
    );
    setMatches(filteredData);
  }

  useEffect(() => {
    getMatches();
  }, []);

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
