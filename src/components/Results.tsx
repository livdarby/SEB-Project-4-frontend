import React from "react";
import MatchWeek from "./MatchWeek";

function Results({ user }: any) {
  const [selected, setSelected] = React.useState<any>(32);

  function handleClick(e: any) {
    e.preventDefault();
    setSelected(Number(e.target.id));
  }

  return (
    <>
      <ul className="flex border-b justify-center bg-[#d3ecfb] border-1 border-white">
        {/* <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="30"
            className={
              "bg-white inline-block py-2 px-4 font-semibold " +
              (selected === 30
                ? "border-l border-t border-r rounded-t text-teal-700"
                : "text-teal-500 hover:text-teal-800")
            }
          >
            Week 30
          </a>
        </li> */}
        {/* <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="31"
            className={
              "bg-white inline-block py-2 px-4 font-semibold " +
              (selected === 31
                ? "border-l border-t border-r rounded-t text-teal-700"
                : "text-teal-500 hover:text-teal-800")
            }
          >
            Week 31
          </a>
        </li> */}
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
        {selected && <MatchWeek user={user} selected={selected} />}
      </section>
    </>
  );
}

export default Results;
