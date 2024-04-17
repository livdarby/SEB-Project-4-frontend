import React from "react";
import { SyntheticEvent } from "react";
import Week32 from "./Week32";

function Results({ user }: any) {
  const [selected, setSelected] = React.useState(32);

  function handleClick(e: any) {
    setSelected(Number(e.target.id));
  }

  return (
    <>
      <ul className="flex border-b">
        <li className="-mb-px mr-1">
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
        </li>
        <li className="-mb-px mr-1">
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
        </li>
        <li className="-mb-px mr-1 ">
          <a
            onClick={handleClick}
            id="32"
            className={
              "bg-white inline-block py-2 px-4 font-semibold " +
              (selected === 32
                ? "border-l border-t border-r rounded-t text-teal-700"
                : "text-teal-500 hover:text-teal-800")
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
              "bg-white inline-block py-2 px-4 font-semibold " +
              (selected === 33
                ? "border-l border-t border-r rounded-t text-teal-700"
                : "text-teal-500 hover:text-teal-800")
            }
          >
            Week 33
          </a>
        </li>
      </ul>
      <section>{selected === 32 && <Week32 />}</section>
    </>
  );
}

export default Results;
