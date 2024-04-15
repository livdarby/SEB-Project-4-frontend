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
  console.log(team_one_name, team_two_name);
  return (
    <>
      <div className="field">
        <p>{match_date.substring(0, match_date.indexOf('2024') + '2024'.length)}</p>
        <label htmlFor="" className="label">
          {team_one_name}
        </label>
        <input type="text" className="input" placeholder="score..." />
        <p>V</p>
        <label htmlFor="" className="label mt-2">
          {team_two_name}
        </label>
        <input type="text" className="input" placeholder="score..." />
      </div>
    </>
  );
}

export default MatchCard;
