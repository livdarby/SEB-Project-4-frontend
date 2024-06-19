import { useEffect, useState } from "react";

function UserCard({ username, score, scores_list }: any) {
  const [numberofPredictionsMade, setNumberOfPredictionsMade] = useState<any>(null);

  useEffect(() => {
    function checkNumberOfPredictions() {
      scores_list && setNumberOfPredictionsMade(scores_list.length);
    }
    checkNumberOfPredictions()
  }, []);

  // console.log(scores_list);
  return (
    <>
      <div className="flex justify-center border border-t-0 md:max-w-[50%] max-w-[80%] mx-auto">
        <p className="w-[50%] text-center border-r">{username}</p>
        <p className="w-[50%] text-center border-r">{score}</p>
        <p className="w-[50%] text-center">{numberofPredictionsMade}</p>
      </div>
    </>
  );
}

export default UserCard;
