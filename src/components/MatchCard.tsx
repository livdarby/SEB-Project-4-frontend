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
}: IDatabaseMatch) {
  const navigate = useNavigate();

  const [matchModel, setMatchModel] = React.useState(null);

  const [formData, setFormData] = React.useState<any>({
    team_one_name: team_one_name,
    team_two_name: team_two_name,
    team_one_score: "",
    team_two_score: "",
    match: null,
  });

  React.useEffect(() => {
    async function getMatchById() {
      const token = localStorage.getItem("token");
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

  console.log(matchModel);

  const [ScoreOneInputted, setScoreOneInputted] = React.useState(false);
  const [ScoreTwoInputted, setScoreTwoInputted] = React.useState(false);

  console.log(formData);

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

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const resp = await axios.post("/api/predictions", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log(resp.data);
    navigate("/predictions");
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <p className="text-xs">
          {match_date.substring(0, match_date.indexOf("2024") + "2024".length)}
        </p>
        <div className="flex w-full -mx-3 mb-6 text-center">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
              {team_one_name}
            </label>
            <input
              className={
                "text-center appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight border-red-500 focus:outline-none focus:bg-white " +
                (ScoreOneInputted
                  ? "focus:border-gray-500 border-gray-500"
                  : "border-red-500")
              }
              id="grid-first-name"
              type="text"
              placeholder="Score"
              name={"team_one_score"}
              value={formData.team_one_score}
              onChange={handleChange}
            />
            {!ScoreOneInputted && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
              {team_two_name}
            </label>
            <input
              className={
                "text-center appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-2 leading-tight border-red-500 focus:outline-none focus:bg-white " +
                (ScoreTwoInputted
                  ? "focus:border-gray-500 border-gray-500"
                  : "border-red-500")
              }
              id="grid-last-name"
              type="text"
              placeholder="Score"
              name={"team_two_score"}
              value={formData.team_two_score}
              onChange={handleChange}
            />

            {!ScoreTwoInputted && (
              <p className="text-red-500 text-xs italic">
                Please fill out this field.
              </p>
            )}
          </div>
          <div className="w-full md:w-1/2 px-3 flex items-center">
            <button
              className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              type="button"
              onClick={handleSubmit}
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
