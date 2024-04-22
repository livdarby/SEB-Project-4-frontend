import React from "react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { baseUrl } from "../config";

function SignIn({ fetchUser }: any) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [dataInputted, setDataInputted] = React.useState(false);

  const [token, setToken] = React.useState(localStorage.getItem("token"));
  // console.log(token);

  const [errorMessage, setErrorMessage] = React.useState("");

  const navigate = useNavigate();

  function handleChange(e: any) {
    setErrorMessage("");
    const fieldName = e.target.name;
    const newFormData = structuredClone(formData);
    newFormData[fieldName as keyof typeof formData] = e.target.value;
    setFormData(newFormData);
  }

  async function handleSubmit(e: SyntheticEvent) {
    try {
      e.preventDefault();
      const resp = await axios.post(`${baseUrl}/login`, formData);
      // console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      setToken(localStorage.getItem("token"));
      fetchUser();
      navigate("/");
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  }

  // console.log(formData);

  return (
    <section className="bg-[#d3ecfb] h-screen flex pt-10">
      <div className="mx-auto w-full h-full max-w-xs">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border-solid border-2 border-amber-500">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline " +
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
                Please enter username and password.
              </p>
            )}
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className={
                "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2 leading-tight focus:outline-none focus:shadow-outline " +
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
                Please enter username and password.
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <Link
              to="/signup"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            >
              Create Account
            </Link>
          </div>
        </form>
        <p className="text-center text-xs uppercase tracking-wide font-semibold text-gray-400">
          &copy;2024 Premier Picks. An app by liv darby.
        </p>
      </div>
    </section>
  );
}

export default SignIn;
