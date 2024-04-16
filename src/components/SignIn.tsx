import React from "react";
import { useNavigate } from "react-router-dom";
import { SyntheticEvent } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function SignIn({ fetchUser }: any) {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const [token, setToken] = React.useState(localStorage.getItem("token"));
  console.log(token);

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
    console.log("button");
    try {
      e.preventDefault();
      const resp = await axios.post("/api/login", formData);
      console.log(resp.data);
      localStorage.setItem("token", resp.data.token);
      setToken(localStorage.getItem("token"));
      fetchUser();
      navigate("/predictions");
    } catch (e: any) {
      setErrorMessage(e.response.data.message);
    }
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full h-full max-w-xs">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            name={"email"}
            type="text"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            name={"password"}
            type="password"
            placeholder="******************"
            value={formData.password}
            onChange={handleChange}
          />
          <p className="text-red-500 text-xs italic">
            Please enter your username and password.
          </p>
        </div>
        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
          <Link to="/signup"
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          >
            Create Account
          </Link>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2024 Premier Picks. All rights reserved.
      </p>
    </div>
  );
}

export default SignIn;
