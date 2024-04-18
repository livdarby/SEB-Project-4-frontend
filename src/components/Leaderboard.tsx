import React from "react";

function Leaderboard({ user }: any) {
  const token = localStorage.getItem("token");
  const [users, setUsers] = React.useState<any>(null);

  async function getUsers() {
    const resp = await fetch("/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    setUsers(data);
  }

  React.useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="flex flex-col justify-start h-screen bg-[#d3ecfb] items-center">
      <h1 className="mt--2 text-center text-3xl tracking-wide py-10 font-marker tracking-widest text-[#1884ef]">
        LEADERBOARD
      </h1>
      <div>
        <table className="table-auto bg-[#ef8318] border-solid border-2 border-gray-300 h-2/4">
          <thead className="border-solid border-2 border-gray-300">
            <tr>
              <th className="bg-[#ef8318] border-solid border-2 border-gray-300 px-8 uppercase tracking-wide text-gray-700 text-s font-bold text-white">
                Username
              </th>
              <th className="bg-[#ef8318] border-solid border-2 border-gray-300 px-8 uppercase tracking-wide text-gray-700 text-s font-bold text-white">
                Total Score
              </th>
              <th className="bg-[#ef8318] border-solid border-2 border-gray-300 px-8 uppercase tracking-wide text-gray-700 text-s font-bold text-white">
                Accuracy
              </th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user: any) => {
                return (
                  <>
                    <tr>
                      <td className="bg-white uppercase tracking-wide text-gray-700 text-s font-bold text-center border-2 border-gray-300">
                        {user.username}
                      </td>
                      <td className="bg-white uppercase tracking-wide text-gray-700 text-s font-bold text-center border-2 border-gray-300">
                        {user.total_score}
                      </td>
                      <td className="bg-white uppercase tracking-wide text-gray-700 text-s font-bold text-center border-2 border-gray-300">
                        {(user.total_score / 60) * 100}%
                      </td>
                    </tr>
                  </>
                );
              })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Leaderboard;
