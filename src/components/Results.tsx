import React from "react";
import { SyntheticEvent } from "react";
import Week33 from "./Week33";

function Results({ user }: any) {
  const [selected, setSelected] = React.useState<any>(32);

  function handleClick(e: any) {
    e.preventDefault()
    setSelected(Number(e.target.id));
  }

  return (
    <>
      <ul className="flex border-b justify-center">
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
        <li className="-mb-px mr-1">
          <a
            onClick={handleClick}
            id="34"
            className={
              "bg-white inline-block py-2 px-4 font-semibold " +
              (selected === 34
                ? "border-l border-t border-r rounded-t text-teal-700"
                : "text-teal-500 hover:text-teal-800")
            }
          >
            Week 34
          </a>
        </li>
      </ul>
      <section>{selected && <Week33 user = {user} selected={selected} />}</section>
    </>
  );
}

export default Results;
