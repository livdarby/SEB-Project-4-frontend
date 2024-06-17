import { IMatch, IDatabaseMatch } from "../../interfaces/match";
import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../config";

function MatchCard({
  date_created,
  id,
  match_date,
  team_one_name,
  team_two_name,
  team_one_score,
  team_two_score,
  user,
}: IDatabaseMatch) {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const today = new Date();
  const match = new Date(match_date);

  const [matchModel, setMatchModel] = React.useState(null);
  const [predictionSubmitted, setPredictionSubmitted] = React.useState(false);
  const [predictions, setPredictions] = React.useState<any>(null);
  const [ScoreOneInputted, setScoreOneInputted] = React.useState(false);
  const [ScoreTwoInputted, setScoreTwoInputted] = React.useState(false);
  const [formData, setFormData] = React.useState<any>({
    team_one_name: team_one_name,
    team_two_name: team_two_name,
    team_one_score: "",
    team_two_score: "",
    match: null,
  });
  const [matchHasOccurred, setMatchHasOccurred] = React.useState(false);
  const [selectedEdit, setSelectedEdit] = React.useState(false);
  // console.log(matchHasOccurred);

  React.useEffect(() => {
    async function getMatchById() {
      const resp = await fetch(`${baseUrl}/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      setMatchModel(data);
    }
    getMatchById();
    if (new Date(match_date) <= new Date()) {
      setMatchHasOccurred(true);
    }
  }, []);

  React.useEffect(() => {
    if (matchModel) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        match: matchModel,
      }));
    }
  }, [matchModel]);

  React.useEffect(() => {
    if (matchModel) {
      // console.log(user);
      getPredictionsByUser(id);
    }
  }, [matchModel]);

  async function getPredictionsByUser(id: any) {
    const resp = await fetch(`${baseUrl}/predictions/${user.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const filtered_data = data.filter((prediction: any) => {
      return prediction.match.id === id;
    });
    setPredictions(filtered_data);
    if (filtered_data.length > 0) {
      setPredictionSubmitted(true);
    }
  }

  async function handleSubmit(e: SyntheticEvent) {
    const token = localStorage.getItem("token");
    e.preventDefault();
    if (selectedEdit) {
      await axios.put(`${baseUrl}/predictions/${predictions[0].id}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } else {
      await axios.post(`${baseUrl}/predictions`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
    navigate("/predictions");
    await getPredictionsByUser(id);
    setPredictionSubmitted(true);
    setScoreOneInputted(true);
    setScoreTwoInputted(true);
    setSelectedEdit(false);
  }

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof newFormData] = e.target.value;
    setFormData(newFormData);
    if (newFormData.team_one_score) {
      setScoreOneInputted(true);
    } else {
      setScoreOneInputted(false);
    }
    if (newFormData.team_two_score) {
      setScoreTwoInputted(true);
    } else {
      setScoreTwoInputted(false);
    }
  }

  function handleEdit(e: any) {
    setPredictionSubmitted(false);
    setSelectedEdit(true);
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg mx-5 flex items-center"
      >
        <div className="bg-white border-solid border-2 border-amber-500 flex flex-col items-center w-full -mx-3 mb-6 text-center hover:bg-orange-200">
          <p className="my-4 text-xs">
            {match_date.substring(
              0,
              match_date.indexOf("2024") + "2024".length
            )}
          </p>
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="flex justify-center items-center min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {team_one_name}
            </label>
            <input
              className={
                "text-center disabled:opacity-50 appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white " +
                (ScoreOneInputted || predictionSubmitted || matchHasOccurred
                  ? "focus:border-gray-500 border-gray-500 bg-gray-300"
                  : "border-amber-600")
              }
              id="grid-first-name"
              type="text"
              placeholder="Score"
              name={"team_one_score"}
              value={
                predictionSubmitted
                  ? predictions[0].team_one_score
                  : formData.team_one_score
              }
              onChange={handleChange}
              disabled={predictionSubmitted || matchHasOccurred}
            />
            {!ScoreOneInputted && !predictionSubmitted && (
              <p className="text-amber-600 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="flex justify-center items-center min-h-10 block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {team_two_name}
            </label>
            <input
              className={
                "text-center disabled:opacity-50 appearance-none block w-full bg-gray-100 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white " +
                (ScoreTwoInputted || predictionSubmitted || matchHasOccurred
                  ? "focus:border-gray-500 border-gray-500 bg-gray-300"
                  : "border-amber-600")
              }
              id="grid-last-name"
              type="text"
              placeholder="Score"
              name={"team_two_score"}
              value={
                predictionSubmitted
                  ? predictions[0].team_two_score
                  : formData.team_two_score
              }
              onChange={handleChange}
              disabled={predictionSubmitted || matchHasOccurred}
            />

            {!ScoreTwoInputted && !predictionSubmitted && (
              <p className="text-amber-600 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="my-4 w-full md:w-1/2 px-3 flex justify-around">
            <button
              className="min-w-20 h-15 flex-shrink-0 bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
              type="button"
              onClick={handleSubmit}
              disabled={(predictionSubmitted || matchHasOccurred) && true}
            >
              Submit
            </button>
            <button
              className="min-w-20 h-15 flex-shrink-0 bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
              type="button"
              onClick={handleEdit}
              disabled={matchHasOccurred}
              // disabled={predictionSubmitted && true}
            >
              Edit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MatchCard;
