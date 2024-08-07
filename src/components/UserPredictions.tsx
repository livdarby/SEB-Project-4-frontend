import { useEffect, useState } from "react";
import { baseUrl } from "../config";

function UserPredictions({ userId, matchId }: any) {
  const token = localStorage.getItem("token");
  const [userPredictions, setUserPredictions] = useState<any>(null);

  async function getAzPredictions(userId: any, matchId: any) {
    const resp = await fetch(
      `${baseUrl}/prediction_by_user_and_match/${matchId}/${userId}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const data = await resp.json();
    setUserPredictions(data[0]);
  }

  useEffect(() => {
    getAzPredictions(userId, matchId);
  }, []);

  return (
    <>
      {userPredictions ? (
        <p>
          {" "}
          {userPredictions.team_one_score} - {""}
          {userPredictions.team_two_score}
        </p>
      ) : (
        <p>No prediction submitted</p>
      )}
    </>
  );
}

export default UserPredictions;
