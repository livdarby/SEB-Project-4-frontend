import { IMatch, IDatabaseMatch } from "../../interfaces/match";
import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
  const today = new Date
  const match = new Date(match_date)

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

  console.log(matchModel, predictionSubmitted, predictions);

  React.useEffect(() => {
    async function getMatchById() {
      const resp = await fetch(`/api/match/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await resp.json();
      setMatchModel(data);
    }
    getMatchById();
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
    const resp = await fetch(`/api/predictions/${user.id}`, {
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
    e.preventDefault();
    const token = localStorage.getItem("token");
    await axios.post("/api/predictions", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    // console.log(resp.data);
    navigate("/predictions");
    await getPredictionsByUser(id);
    setPredictionSubmitted(true);
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

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg flex justify-center flex-wrap"
      >
        <p className="text-xs">
          {match_date.substring(0, match_date.indexOf("2024") + "2024".length)}
        </p>
        <div className="flex w-full -mx-3 mb-6 text-center">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {team_one_name}
            </label>
            <input
              className={
                "text-center disabled:opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight border-red-500 focus:outline-none focus:bg-white " +
                (ScoreOneInputted
                  ? "focus:border-gray-500 border-gray-500"
                  : "border-red-500")
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
              disabled={predictionSubmitted || today >= match && true}
            />
            {!ScoreOneInputted && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              {team_two_name}
            </label>
            <input
              className={
                "text-center disabled:opacity-50 appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight border-red-500 focus:outline-none focus:bg-white " +
                (ScoreTwoInputted
                  ? "focus:border-gray-500 border-gray-500"
                  : "border-red-500")
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
              disabled={predictionSubmitted || today >= match && true}
            />

            {!ScoreTwoInputted && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 flex justify-center items-center">
            <button
              className="h-15 flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded disabled:opacity-40"
              type="button"
              onClick={handleSubmit}
              disabled={predictionSubmitted && true}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default MatchCard;
