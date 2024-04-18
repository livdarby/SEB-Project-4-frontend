import React from "react";
import MatchWeek from "./MatchWeek";

function Results({ user }: any) {
  const [selected, setSelected] = React.useState<any>(32);
  const [userPoints, setUserPoints] = React.useState<any>(null);
  const currentUser = user;
  const token = localStorage.getItem("token");

  function handleClick(e: any) {
    e.preventDefault();
    setSelected(Number(e.target.id));
  }

  async function getUserPoints() {
    const resp = await fetch(`/api/checkpredictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setUserPoints(data.message)
  }

  React.useEffect(() => {
    getUserPoints();
  }, []);

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
      </ul>
      <section className="bg-[#d3ecfb]">
        {selected && <MatchWeek user={currentUser} selected={selected} userPoints={userPoints} />}
      </section>
    </>
  );
}

export default Results;
