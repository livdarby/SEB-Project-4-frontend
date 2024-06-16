
function UserCard({ username, score }: any) {

  return (
    <>
      <div className="flex justify-center border border-t-0 max-w-[50%] mx-auto">
        <p className="w-[50%] text-center border-r">{username}</p>
        <p className="w-[50%] text-center">{score}</p>
      </div>
    </>
  );
}

export default UserCard;
