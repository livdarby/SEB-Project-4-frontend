import React from "react";

function Week32() {
  const [matches, setMatches] = React.useState<any>(null);
  const week32Start = new Date("Mon, 1 Apr 2024");
  const week32End = new Date("Sun, 7 Apr 2024");

  React.useEffect(() => {
    getLastWeekMatches();
  }, []);

  async function getLastWeekMatches() {
    const resp = await fetch("/api/matches");
    const data = await resp.json();
    const filtered_data = data.filter((match: any) => {
      const matchDate = new Date(match.match_date);
      return (
        matchDate >= new Date(week32Start) && matchDate <= new Date(week32End)
      );
    });
    setMatches(filtered_data);
  }

  return (
    <form>
      {!matches && <p>Loading results...</p>}
      {matches &&
        matches.map((match: any) => {
          return (
            <div>
              <div className="max-w-sm rounded overflow-hidden shadow-lg">
                {/* <img
                  className="w-full"
                  src="/img/card-top.jpg"
                  alt="Sunset in the mountains"
                /> */}
                <div className="flex justify-evenly mt-5">
                  <div className="inline font-bold text-xl mb-2 text-center">
                    {match.team_one_name} <br />
                    {match.team_one_score}
                  </div>
                  <div className="inline font-bold text-xl mb-2 text-center">
                    {match.team_two_name}
                    <br />
                    {match.team_two_score}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </form>
  );
}

export default Week32;
