import { useEffect, useState } from "react";
import { baseUrl } from "../config";
import axios from "axios";

function EditPrediction({ user }: any) {
  const token = localStorage.getItem("token");
  const [userList, setUserList] = useState<any>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const [selectedUser, setSelectedUser] = useState(""); 
  const [errorData, setErrorData] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    username: "",
    team_one_name: "",
    team_two_name: "",
    team_one_score: "",
    team_two_score: "",
  });
  // console.log(formData);

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

  function checkAllFieldsAreTruthy(formData: any) {
    if (
      formData.username &&
      formData.team_one_name &&
      formData.team_one_score &&
      formData.team_two_name &&
      formData.team_two_score
    ) {
      setSubmitDisabled(false);
    } else {
      setSubmitDisabled(true);
    }
  }

  function handleChange(e: any) {
    const formDataCopy = structuredClone(formData);
    // console.log(e.target.name)
    formDataCopy[e.target.id] = e.target.value;
    setFormData(formDataCopy);
    checkAllFieldsAreTruthy(formDataCopy);
    setErrorData("");
  }

  function handleOptionSelect(e: any) {
    // console.log(e.target.value);
    const formDataCopy = structuredClone(formData);
    formDataCopy["username"] = e.target.value;
    setFormData(formDataCopy);
    checkAllFieldsAreTruthy(formDataCopy);
    setErrorData("");
    setSelectedUser(e.target.value)
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
      const resp = await axios.post(`${baseUrl}/admin`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.data.message === "Match not found") {
        setErrorData("Match not found.");
      } else if (resp.data.message === "Prediction already submitted") {
        setErrorData("Prediction already submitted.");
      } else {
        setSubmitDisabled(true);
        setSelectedUser("")
        setFormData({
          username: "",
          team_one_name: "",
          team_two_name: "",
          team_one_score: "",
          team_two_score: "",
        });
      }
    } catch (e: any) {
    //   console.log(e.response.data);
      setErrorData(e.response.data.message);
    }
  }

  return (
    <>
      <form className="my-[10%] py-10 flex flex-col items-center border border-orange-500 border-2 rounded shadow w-[80%] mx-auto">
        <div className="mt-4 flex flex-col items-center w-[100%]">
          <label className="uppercase font-semibold text-sm text-gray-700">
            Username
          </label>
          <select
            className="border rounded md:w-[30%] w-[70%] text-xs uppercase font-semibold tracking-wide"
            onChange={handleOptionSelect}
            value = {selectedUser}
          >
            <option className="text-center" value="" disabled>Select user</option>
            {userList &&
              userList.map((user: any) => {
                return (
                  <option className="text-center" value={user} key={user}>
                    {user}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="mt-4 flex flex-col items-center w-[100%]">
          <label className="uppercase font-semibold text-sm text-gray-700">
            Team One Name
          </label>
          <input
            className="text-sm text-center border rounded w-[70%] md:w-[30%]"
            type="text"
            placeholder="..."
            name="team_one_name"
            id="team_one_name"
            onChange={handleChange}
            value={formData.team_one_name}
          />
        </div>
        <div className="mt-4 flex flex-col items-center w-[100%]">
          <label className="uppercase font-semibold text-sm text-gray-700">
            Team One Score
          </label>
          <input
            className="text-sm text-center border rounded w-[70%] md:w-[30%]"
            type="text"
            placeholder="..."
            name="team_one_score"
            id="team_one_score"
            onChange={handleChange}
            value={formData.team_one_score}
          />
        </div>
        <div className="mt-4 flex flex-col items-center w-[100%]">
          <label className="uppercase font-semibold text-sm text-gray-700">
            Team Two Name
          </label>
          <input
            className="text-sm text-center border rounded w-[70%] md:w-[30%]"
            type="text"
            placeholder="..."
            name="team_two_name"
            id="team_two_name"
            onChange={handleChange}
            value={formData.team_two_name}
          />
        </div>
        <div className="mt-4 flex flex-col items-center w-[100%]">
          <label className="uppercase font-semibold text-sm text-gray-700">
            Team Two Score
          </label>
          <input
            className="text-sm text-center border rounded w-[70%] md:w-[30%]"
            type="text"
            placeholder="..."
            name="team_two_score"
            id="team_two_score"
            onChange={handleChange}
            value={formData.team_two_score}
          />
        </div>
        <button
          className="mt-4 font-bold tracking-wider uppercase text-sm bg-[#1884ef] hover:bg-white hover:text-[#1884ef] border-[#1884ef] hover:border-[#1884ef] text-sm border-2 text-white py-1 px-2 rounded disabled:opacity-40"
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          Submit
        </button>
        {errorData && (
          <p className="uppercase font-semibold text-red-500 text-xs tracking-wide mt-2">
            {errorData}
          </p>
        )}
      </form>
    </>
  );
}

export default EditPrediction;
