import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import UserCard from "./UserCard";

function Leaderboard({ user }: any) {
  const [userScores, setUserScores] = useState<any>([]);
  const token = localStorage.getItem("token");

  async function getUserScores() {
    const resp = await fetch(`${baseUrl}/totaleuroscore`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const sortedData = data["message"].sort(
      (a: any, b: any) => b.score - a.score
    );
    setUserScores(sortedData);
  }

  useEffect(() => {
    getUserScores();
  }, []);

  return (
    <>
      <div>
        <h1 className="font-marker text-center text-[#1884ef] text-3xl tracking-widest mt-10">Leaderboard</h1>
        <div className="flex justify-center mt-10 border max-w-[50%] mx-auto">
          <p className="w-[50%] text-center uppercase text-sm font-semibold text-gray-700 border-r">
            Username
          </p>
          <p className="w-[50%] text-center uppercase text-sm font-semibold text-gray-700">
            Total Score
          </p>
        </div>
        {userScores &&
          userScores.map((user: any) => {
            return <UserCard key={user.id} {...user} />;
          })}
      </div>
    </>
  );
}

export default Leaderboard;
