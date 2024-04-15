import { IMatch } from "../../interfaces/match";

function MatchCard({ date, teams }: IMatch) {
  console.log(teams);
  return (
    <>
      {teams?.map((team) => {
        return (
          <>
            {teams[0] === team && <p>{date}</p>}
            <div className="field">
              <label className="label">{team.name}</label>
              <input type="text" className="input" placeholder="score" />
            </div>
            {teams[0] === team && (
              <>
                <p>V</p>
                <br></br>
              </>
            )}
          </>
        );
      })}
    </>
  );
}

export default MatchCard;
