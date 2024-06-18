import { useEffect, useState } from "react";

function UserCard({ username, score, scores_list }: any) {
  const [correctResult, setCorrectResult] = useState<any>(null);

  useEffect(() => {
    function checkCorrectResult() {
      scores_list && setCorrectResult(scores_list.length);
    }
    checkCorrectResult()
  }, []);

  console.log(scores_list);
  return (
    <>
      <div className="flex justify-center border border-t-0 md:max-w-[50%] max-w-[80%] mx-auto">
        <p className="w-[50%] text-center border-r">{username}</p>
        <p className="w-[50%] text-center border-r">{score}</p>
        <p className="w-[50%] text-center">{correctResult}</p>
      </div>
    </>
  );
}

export default UserCard;
