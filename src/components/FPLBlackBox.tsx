import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import UserPredictions from "./UserPredictions";

function FPLBlackBox({ user }: any) {
  const [selectedMatchWeek, setSelectedMatchWeek] = useState<any>("");
  const [gamesByMatchWeek, setGamesByMatchWeek] = useState<any>(null);
  const [matchWeeks, setMatchWeeks] = useState<any>("");
  const token = localStorage.getItem("token");

  async function getMatchWeeks() {
    const resp = await fetch(`${baseUrl}/matchweeks`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setMatchWeeks(data);
  }

  useEffect(() => {
    getMatchWeeks();
  }, []);

  function handleMatchWeekChange(e: any) {
    setSelectedMatchWeek(e.target.value);
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    getMatchesForSelectedGameWeek(selectedMatchWeek);
  }

  async function getMatchesForSelectedGameWeek(matchWeek: any) {
    const resp = await fetch(`${baseUrl}/matchesbyweek/${matchWeek}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setGamesByMatchWeek(data);
  }

  //   GET AZ PREDICTIONS BY THE CORRESPONDING MATCH ID

  return (
    <>
      <div>
        <h1 className="font-title text-center text-3xl tracking-wider my-3">
          FPL BLACKBOX
        </h1>
        <form>
          <div className="border rounded border-2 max-w-[80%] mx-auto px-5 flex justify-evenly items-center">
            <label className="uppercase text-xs font-semibold tracking-wide">
              Match Week
            </label>
            <select
              className={
                "uppercase text-xs font-semibold tracking-wide " +
                (selectedMatchWeek === "" && "text-gray-500")
              }
              onChange={handleMatchWeekChange}
              value={selectedMatchWeek}
            >
              <option value="" disabled>
                Select
              </option>
              {matchWeeks &&
                matchWeeks.map((matchWeek: any) => {
                  return (
                    <option value={matchWeek} key={matchWeek}>
                      {matchWeek}
                    </option>
                  );
                })}
            </select>
            <button
              className="uppercase text-xs font-semibold tracking-wide text-red-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </form>
        <div className="border border-2 max-w-[80%] mx-auto flex flex-col items-center">
          {gamesByMatchWeek && (
            <div className="font-title flex w-[100%] justify-between">
              <div className="ml-[10%]">AZ</div>
              <div className="mr-[10%]">MARK</div>
            </div>
          )}
          {gamesByMatchWeek &&
            gamesByMatchWeek.map((game: any) => {
              return (
                <>
                  <div
                    key={game.id}
                    className="flex uppercase text-sm font-bold tracking-wider w-[100%]"
                  >
                    {" "}
                    <div className="min-w-[25%] text-center">
                      <UserPredictions userId={39} matchId={game.id} />
                      {/* AZ's ID = 39 */}
                    </div>
                    <div className="flex justify-center min-w-[50%]">
                      <p className="mx-5  text-center w-[20%]">
                        {game.team_one_name}
                      </p>
                      <p className=" text-center w-[20%]">VS</p>
                      <p className="mx-5  text-center w-[20%]">
                        {game.team_two_name}
                      </p>
                    </div>
                    <div className="min-w-[25%] text-center">
                      <UserPredictions userId={51} matchId={game.id} />
                      {/* MARK's ID = 51 */}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default FPLBlackBox;
