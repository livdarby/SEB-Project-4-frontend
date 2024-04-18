import React from "react";
import axios from "axios";

function MemberPoints({
  backgroundColour,
  user,
  match,
  sendDataToParent,
}: any) {
  const token = localStorage.getItem("token");
  const [memberPoints, setMemberPoints] = React.useState(user.total_score);

  const sendData = () => {
    const data = memberPoints;
    sendDataToParent(data);
  };

  React.useEffect(() => {
    if (backgroundColour === "bg-amber-300") {
      setMemberPoints(1);
    } else if (backgroundColour === "bg-rose-300") {
      setMemberPoints(0);
    } else {
      setMemberPoints(3);
    }
    sendData();
  }, [match]);

  return (
    <div className="flex flex-col justify-center">
      <div>
        {backgroundColour === "bg-amber-300"}
        {backgroundColour === "bg-rose-300"}
        {backgroundColour === "bg-green-400"}
      </div>
    </div>
  );
}

export default MemberPoints;
