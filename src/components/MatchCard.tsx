import { IMatch, IDatabaseMatch } from "../../interfaces/match";

function MatchCard({
  date_created,
  id,
  match_date,
  team_one_name,
  team_two_name,
  team_one_score,
  team_two_score,
}: IDatabaseMatch) {

  


  return (
    <>
      <form className="w-full max-w-lg">
        <p className="text-xs">
          {match_date.substring(0, match_date.indexOf("2024") + "2024".length)}
        </p>
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
              {team_one_name}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              id="grid-first-name"
              type="text"
              placeholder="Score"
            />
            <p className="text-red-500 text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="w-full md:w-1/2 px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-s font-bold mb-2">
              {team_two_name}
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="grid-last-name"
              type="text"
              placeholder="Score"
            />
          </div>
        </div>
      </form>
    </>
  );
}

export default MatchCard;
