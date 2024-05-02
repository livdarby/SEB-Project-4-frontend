function ScoreUpdate({ user }: any) {
  return (
    <>
      <form className="flex flex-col items-center">
        <label className="text-center">Team One Name</label>
        <input className="text-center" type="text" placeholder="Name" />
        <label className="text-center">Team Two Name</label>
        <input className="text-center" type="text" placeholder="Name" />
        <button>Search</button>
      </form>
    </>
  );
}

export default ScoreUpdate;
