import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";

function EuroMatchCard({
  team_one_name,
  team_two_name,
  team_one_score,
  team_two_score,
  id,
  user
}: any) {
  type FormDataType = {
    [key: string]: string | null;
  };

  const [formData, setFormData] = useState<FormDataType>({
    team_one_name: `${team_one_name}`,
    team_two_name: `${team_two_name}`,
    team_one_score: "",
    team_two_score: "",
    match: null,
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [inputsDisabled, setInputsDisabled] = useState(false);
  const [matchModel, setMatchModel] = useState(null);
  const token = localStorage.getItem("token");
  console.log(id)

  
  async function getPredictionsByUser(id : any) {
        const resp = await fetch(`${baseUrl}/predictions/${user.id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await resp.json()
        const filteredData = data.filter((prediction : any) => {return prediction.match.id === id})
        console.log(filteredData)
    }

  useEffect(() => {
    async function getMatchId() {
      const resp = await fetch(`${baseUrl}/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      setMatchModel(data);
    }
    getMatchId();
    getPredictionsByUser(id)
  }, []);

// we have found the predictions by user
// next, we need to introduce an edit button
// and disable submit when the match has passed

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formDataCopy = structuredClone(formData);
    formDataCopy[e.target.name] = e.target.value;
    formDataCopy.match = matchModel;
    setFormData(formDataCopy);
    formDataCopy.team_one_score && formDataCopy.team_two_score
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    await axios.post(`${baseUrl}/predictions`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setButtonDisabled(true);
    setInputsDisabled(true);
  }

  return (
    <form className="w-full max-w-lg mx-5 flex items-center">
      <div className="bg-white border-solid border-2 border-amber-500 flex flex-col items-center w-full -mx-3 mb-6 text-center hover:bg-orange-200">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="flex justify-center items-center min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {team_one_name}
          </label>
          <input
            onChange={handleChange}
            className="text-center disabled:opacity-50 appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Score"
            id={"team_one_score"}
            name="team_one_score"
            disabled={inputsDisabled}
          />
        </div>
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="flex justify-center items-center min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
            {team_two_name}
          </label>
          <input
            onChange={handleChange}
            className="text-center disabled:opacity-50 appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white"
            type="text"
            placeholder="Score"
            id={"team_two_score"}
            name="team_two_score"
            disabled={inputsDisabled}
          />
        </div>
        <div className="my-4 w-full md:w-1/2 px-3 flex justify-around">
          <button
            onClick={handleSubmit}
            disabled={buttonDisabled}
            className="uppercase min-w-20 h-15 flex-shrink-0 bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  );
}

export default EuroMatchCard;
