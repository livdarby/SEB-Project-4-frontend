import { IMatch } from "../../interfaces/match";

function MatchCard({ date, teams }: IMatch) {
  console.log(teams);
  return (
    <div>
      {teams?.map((team) => {
        return <p>{team.name}</p>;
      })}
    </div>
  );
}

export default MatchCard;
