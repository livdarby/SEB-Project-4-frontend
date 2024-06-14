import axios from "axios";
import { baseUrl } from "../config";
import { useState } from "react";

function ScoreUpdate({ user }: any) {
  const [formData, setFormData] = useState<any>({
    team_one_name: "",
    team_two_name: "",
    team_one_score: "",
    team_two_score: "",
  });
  const [matchFound, setMatchFound] = useState(false);
  const token = localStorage.getItem("token");
  console.log(formData);
  console.log(matchFound);

  function handleChange(e: any) {
    const formDataCopy = structuredClone(formData);
    formDataCopy[e.target.name] = e.target.value;
    setFormData(formDataCopy);
  }

  async function handleSubmit(e: any) {
    try {
      e.preventDefault();
      await axios.put(`${baseUrl}/scores`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      if (error.response.status === 500) {
        console.log("Match found but scores needed! Proceed.");
        setMatchFound(true);
      } else if (error.response.status === 404) {
        console.log(
          "Match not found in the database. Check your input fields or post the match first."
        );
      }
    }
  }

  return (
    <>
      <div className="h-screen flex flex-col justify-center">
        <form className="flex flex-col items-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-10 border-solid border-2 border-amber-500">
          <label
            className="uppercase text-center text-gray-700 text-sm font-bold mb-2"
            htmlFor="tournament"
          >
            Tournament
          </label>
          <select
            defaultValue={"Select"}
            name="tournament"
            id="tournament"
            className="uppercase text-center text-gray-700 font-semibold border rounded shadow px-10 py-1 mb-2 text-sm tracking-wide"
          >
            <option value="euros">Euros</option>
            <option value="premier_league">Premier League</option>
          </select>
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Team One Name
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            name="team_one_name"
            value={formData.team_one_name}
            onChange={handleChange}
          />
          <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
            Team Two Name
          </label>
          <input
            className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Name"
            name="team_two_name"
            value={formData.team_two_name}
            onChange={handleChange}
          />
          {matchFound && (
            <>
              <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
                {formData.team_one_name}'s Score
              </label>
              <input
                className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Score"
                name="team_one_score"
                value={formData.team_one_score}
                onChange={handleChange}
              />
              <label className="uppercase text-center text-gray-700 text-sm font-bold mb-2">
                {formData.team_two_name}'s Score
              </label>
              <input
                className="text-center shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Score"
                name="team_two_score"
                value={formData.team_two_score}
                onChange={handleChange}
              />
            </>
          )}
          <button
            onClick={handleSubmit}
            className="font-bold tracking-widest my-2 uppercase text-xs bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
          >
            Next
          </button>
        </form>
      </div>
    </>
  );
}

export default ScoreUpdate;
