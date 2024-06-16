import { useEffect, useState } from "react";
import { baseUrl } from "../config";

function EditPrediction({ user }: any) {
  const token = localStorage.getItem("token");
  const [userList, setUserList] = useState<any>(null);
  console.log(userList);

  async function getUsers() {
    const resp = await fetch(`${baseUrl}/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await resp.json();
    const users = [] as any;
    const filteredData = data.filter((data: any) => {
      return data.id !== 1;
    });
    filteredData.map((user: any) => {
      return users.push(user.username);
    });
    setUserList(users);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <form className="mt-[20%] flex flex-col items-center border rounded shadow w-[80%] mx-auto">
        <div className="mt-4 flex flex-col items-center">
          <label className="uppercase font-semibold text-xs text-gray-700">
            Username
          </label>
          <select>
            {userList &&
              userList.map((user: any) => {
                return (
                  <option value={user} key={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="uppercase font-semibold text-xs text-gray-700">
            Team One Name
          </label>
          <input
            className="text-sm text-center border rounded"
            type="text"
            placeholder="Team One Name"
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="uppercase font-semibold text-xs text-gray-700">
            Team One Score
          </label>
          <input
            className="text-sm text-center border rounded"
            type="text"
            placeholder="Team One Score"
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="uppercase font-semibold text-xs text-gray-700">
            Team Two Name
          </label>
          <input
            className="text-sm text-center border rounded"
            type="text"
            placeholder="Team Two Name"
          />
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="uppercase font-semibold text-xs text-gray-700">
            Team Two Score
          </label>
          <input
            className="text-sm text-center border rounded"
            type="text"
            placeholder="Team Two Score"
          />
        </div>
        <button className="mt-4">Submit</button>
      </form>
    </>
  );
}

export default EditPrediction;
