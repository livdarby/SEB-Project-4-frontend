import React, { SyntheticEvent } from "react";
import axios from "axios";
import { baseUrl } from "../config";

function PostMatches({ user }: any) {
  const [matchData, setMatchData] = React.useState({
    team_one_name: "",
    team_two_name: "",
    match_date: "",
    match_week: "",
    tournament: ""
  });
  const [errorData, setErrorData] = React.useState<any>(null);
  const [disabled, setDisabled] = React.useState(true);
  // console.log(matchData);

  function checkAllFieldsAreTruthy(matchData: any) {
    if (
      matchData.team_one_name &&
      matchData.team_two_name &&
      matchData.match_date &&
      matchData.match_week && matchData.tournament
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  function handleChange(e: any) {
    const matchDataCopy = structuredClone(matchData);
    if (e.target.id === "team_one_name") {
      matchDataCopy.team_one_name = e.target.value;
      setMatchData(matchDataCopy);
      checkAllFieldsAreTruthy(matchDataCopy);
    } else if (e.target.id === "team_two_name") {
      matchDataCopy.team_two_name = e.target.value;
      setMatchData(matchDataCopy);
      checkAllFieldsAreTruthy(matchDataCopy);
    } else if (e.target.id === "match_week") {
      matchDataCopy.match_week = e.target.value;
      setMatchData(matchDataCopy);
      checkAllFieldsAreTruthy(matchDataCopy);
    } else if (e.target.id === "tournament") {
      matchDataCopy.tournament = e.target.value;
      setMatchData(matchDataCopy);
      checkAllFieldsAreTruthy(matchDataCopy);
    } else {
      matchDataCopy.match_date = e.target.value;
      setMatchData(matchDataCopy);
      checkAllFieldsAreTruthy(matchDataCopy);
    }
  }

  async function handleSubmit(e: any) {
    setErrorData(null);
    e.preventDefault();
    // console.log(matchData);
    const token = localStorage.getItem("token");
    try {
      await axios.post(`${baseUrl}/matches`, matchData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatchData({
        team_one_name: "",
        team_two_name: "",
        match_date: "",
        match_week: "",
        tournament: ""
      });
      setDisabled(true);
    } catch (e: any) {
      // console.log(e.response.data);
      setErrorData(e.response.data);
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col md:justify-center mt-6 sm:mt-0">
        <form className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-10 border-solid border-2 border-amber-500">
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Tournament
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Euros or Premier League"
            onChange={handleChange}
            id={"tournament"}
            value={matchData.tournament}
          />
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Team One Name
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            id={"team_one_name"}
            value={matchData.team_one_name}
          />
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Team Two Name
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            onChange={handleChange}
            id={"team_two_name"}
            value={matchData.team_two_name}
          />
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Match Week
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Week"
            onChange={handleChange}
            id={"match_week"}
            value={matchData.match_week}
          />
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Match Date
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="datetime-local"
            onChange={handleChange}
            id={"match_date"}
            value={matchData.match_date}
          />
          <button
            onClick={handleSubmit}
            disabled={disabled}
            className="uppercase text-xs bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
          >
            Submit to database
          </button>
          {errorData && (
            <p className="uppercase tracking-wide text-xs mt-3 text-orange-600 font-semibold">
              {errorData.message}
            </p>
          )}
        </form>
      </div>
    </>
  );
}

export default PostMatches;
