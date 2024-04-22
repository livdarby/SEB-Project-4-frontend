import { useNavigate } from "react-router-dom";
import React from "react";
import { SyntheticEvent } from "react";
import axios from "axios";
import { baseUrl } from "../config";

function SignUp() {
  const navigate = useNavigate();
  const [dataInputted, setDataInputted] = React.useState(false);

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    invite_code: "",
  });

  const [errorData, setErrorData] = React.useState({
    email: "",
    username: "",
    password: "",
    invite_code: "",
  });

  // console.log(formData);
  // console.log(errorData);

  function handleChange(e: any) {
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
    setDataInputted(true);
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/signup`, formData);
      // console.log(resp.data);
      navigate("/signin");
    } catch (e: any) {
      setErrorData(e.response.data.errors);
      // console.log(errorData);
    }
  }
  return (
    <section className="bg-[#d3ecfb] h-screen flex pt-10">
      <div className="mx-auto bg-[#d3ecfb] w-full h-full max-w-xs flex flex-col">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-amber-500">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Username
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline " +
                (dataInputted ? "border-gray-500" : "border-amber-600")
              }
              name={"username"}
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
            />
            {!dataInputted && (
              <p className="text-amber-600 text-xs italic">
                Please input all fields.
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " +
                (dataInputted ? "border-gray-500" : "border-amber-600")
              }
              name={"email"}
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />
            {!dataInputted && (
              <p className="text-amber-600 text-xs italic">
                Please input all fields.
              </p>
            )}
          </div>

          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " +
                (dataInputted ? "border-gray-500" : "border-amber-600")
              }
              name={"password"}
              type="password"
              placeholder="******************"
              value={formData.password}
              onChange={handleChange}
            />
            {!dataInputted && (
              <p className="text-amber-600 text-xs italic">
                Please input all fields.
              </p>
            )}
          </div>
          <div className="mb-3">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              League Invite Code
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline " +
                (dataInputted ? "border-gray-500" : "border-amber-600")
              }
              name={"invite_code"}
              type="text"
              placeholder="Invite code"
              value={formData.invite_code}
              onChange={handleChange}
            />
            {!dataInputted && (
              <p className="text-amber-600 text-xs italic">
                Please input all fields.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Create Account
            </button>
          </div>
        </form>
        <p className="text-center text-xs uppercase tracking-wide font-semibold text-gray-400">
          &copy;2024 Premier Picks. An app by liv darby.
        </p>
      </div>
    </section>
  );
}

export default SignUp;
