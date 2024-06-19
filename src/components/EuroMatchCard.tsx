import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../config";

function EuroMatchCard({
  team_one_name,
  team_two_name,
  team_one_score,
  team_two_score,
  id,
  user,
  match_date,
  dateObject,
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
  const [editButtonDisabled, setEditButtonDisabled] = useState(false);
  const [selectedEditButton, setSelectedEditButton] = useState(false);
  const [match, setMatch] = useState(null);
  const [userPredictions, setUserPredictions] = useState<any>(null);
  const token = localStorage.getItem("token");
  const [localKickOff, setLocalKickOff] = useState<any>(null);
  const [matchHasStarted, setMatchHasStarted] = useState<any>(false);

  useEffect(() => {
    // first, we fetch the match object, including all required data fields and upate the match state.
    async function getMatchId() {
      const resp = await fetch(`${baseUrl}/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      setMatch(data);
    }
    // the function is called
    getMatchId();
    // next we get the predictions by user, to check if the user already has a prediction for the match.
    getPredictionsByUser(id);
    // next, we need to check whether the match has started. If it has, we lock the submit & edit buttons, and input fields.
  }, []);

  useEffect(() => {
    hasMatchStarted();
  }, [userPredictions]);

  // This is the function to check whether the match has started.
  function hasMatchStarted() {
    // The match has a match date field. E.g. "Wed, 19 Jun 2024 17:00:00"
    // This is a STRING
    // We need to convert this to the users local timezone and compare it against the current time in their location
    const kickOffInLocalTimeZone = new Date(
      match_date.getTime() - match_date.getTimezoneOffset() * 60000
    );
    setLocalKickOff(kickOffInLocalTimeZone);
    // we have updated the state for the kick off in the local timezone
    // now we have to compare this to the current time in the local timezone
    // if the kick off > the time now IE THE MATCH IS IN THE FUTURE, edit, submit and input should NOT be disabled
    if (kickOffInLocalTimeZone > new Date()) {
      setInputsDisabled(false);
      (userPredictions?.length > 0)
        ? (setEditButtonDisabled(false), setInputsDisabled(true))
        : setEditButtonDisabled(true);
      // console.log("match hasn't started", team_one_name, userPredictions, editButtonDisabled);
      setMatchHasStarted(false);
    } else {
      setInputsDisabled(true);
      setEditButtonDisabled(true);
      setButtonDisabled(true);
      setMatchHasStarted(true);
      // console.log("match has started", team_one_name)
    }
  }

  async function getPredictionsByUser(id: any) {
    const resp = await fetch(`${baseUrl}/predictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const filteredData = data.filter((prediction: any) => {
      return prediction.match.id === id;
    });
    setUserPredictions(filteredData);
  }

  // we have found the predictions by user
  // next, we need to introduce an edit button
  // and disable submit when the match has passed

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formDataCopy = structuredClone(formData);
    formDataCopy[e.target.name] = e.target.value;
    formDataCopy.match = match;
    setFormData(formDataCopy);
    formDataCopy.team_one_score && formDataCopy.team_two_score
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
    selectedEditButton && setButtonDisabled(false);
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    if (userPredictions.length === 0) {
      await axios.post(`${baseUrl}/predictions`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.put(
        `${baseUrl}/predictions/${userPredictions[0].id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    }
    setButtonDisabled(true);
    setInputsDisabled(true);
    setEditButtonDisabled(false);
    setSelectedEditButton(false);
    getPredictionsByUser(id);
  }

  function handleEdit(e: any) {
    e.preventDefault();
    setInputsDisabled(false);
    setSelectedEditButton(true);
  }

  return (
    <form className="w-full max-w-lg mx-5 flex items-center mt-10 ">
      <div className="bg-white border-solid border-2 border-amber-500 flex flex-col items-center w-full mb-6 text-center hover:bg-orange-200">
        <p className="uppercase text-xs font-bold mt-2">
          {match_date.toString()}
        </p>
        {matchHasStarted && (
          <p className="uppercase text-xs font-bold mt-2 text-red-500">
            Match has started - predictions now locked in.
          </p>
        )}
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
            value={
              userPredictions && !selectedEditButton
                ? userPredictions[0]?.team_one_score
                : formData.team_one_score
            }
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
            value={
              userPredictions && !selectedEditButton
                ? userPredictions[0]?.team_two_score
                : formData.team_two_score
            }
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
          <button
            onClick={handleEdit}
            disabled={editButtonDisabled}
            className="uppercase min-w-20 h-15 flex-shrink-0 bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
          >
            Edit
          </button>
        </div>
      </div>
    </form>
  );
}

export default EuroMatchCard;
