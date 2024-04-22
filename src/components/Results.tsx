import React from "react";
import MatchWeek from "./MatchWeek";
import axios from "axios";
import { baseUrl } from "../config";

function Results({ user }: any) {
  const [selected, setSelected] = React.useState<any>(32);
  const [userPoints, setUserPoints] = React.useState<any>(null);
  const [userPointsPopulated, setUserPointsPopulated] = React.useState(false)
  const [userScoreUpdated, setUserScoreUpdated] = React.useState(false)
  const currentUser = user;
  const token = localStorage.getItem("token");
  const [dataRendered, setDataRendered] = React.useState(false)
  console.log("user points: ", userPoints)

  function handleClick(e: any) {
    e.preventDefault();
    setSelected(Number(e.target.id));
    setDataRendered(false)
  }

  async function getUserPoints() {
    const resp = await fetch(`${baseUrl}/checkpredictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setUserPoints(data.message)
    setUserPointsPopulated(true)
  }

  async function updateUserTotalScore() {
    await axios.put(
      `${baseUrl}/user/${user.id}`,
      { total_score: userPoints },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }

  React.useEffect(() => {
    getUserPoints();
  }, []);

  if (userPointsPopulated && !userScoreUpdated) {
    updateUserTotalScore()
    setUserScoreUpdated(true)
  }

  return (
    <>
      <ul className="flex border-b justify-center bg-[#d3ecfb] border-1 border-white">
        <li className="-mb-px mr-1  ">
          <a
            onClick={handleClick}
            id="32"
            className={
              "inline-block py-2 px-4 font-semibold bg-[#d3ecfb] block uppercase tracking-wide " +
              (selected === 32
                ? "border-l border-t border-r border-2 border-white rounded-t text-[#288df1] bg-white/50"
                : "text-[#69c0f0] hover:text-teal-[#288df1]")
            }
          >
            Week 32
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="33"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 33
                ? "border-l border-t border-r border-2 border-white rounded-t text-[#288df1] bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 33
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="34"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 34
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 34
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="29"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 29
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 29
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="35"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 35
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 35
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="36"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 36
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 36
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="37"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 37
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 37
          </a>
        </li>
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="38"
            className={
              "bg-[#d3ecfb] inline-block py-2 px-4 font-semibold block uppercase tracking-wide " +
              (selected === 38
                ? "border-l border-t border-r rounded-t text-[#288df1] border-2 border-white bg-white/50"
                : "text-[#69c0f0] hover:text-[#288df1]")
            }
          >
            Week 38
          </a>
        </li>
      </ul>
      <section className="bg-[#d3ecfb]">
        {selected && <MatchWeek dataRendered={dataRendered} setDataRendered={setDataRendered} user={currentUser} selected={selected} userPoints={userPoints} />}
      </section>
    </>
  );
}

export default Results;
