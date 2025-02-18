import React, { useState } from "react";
import axios from "axios";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password || !name) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Send POST request
      const response = await axios.post(
        "http://localhost:3000/auth/register",
        { name, email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error?.response?.status === 400) {
        setError("Please fill in all fields");
      } else if (!error?.response) {
        setError("Error accessing the server");
      } else if (error.response.status === 409) {
        setError("Email already registered");
      } else {
        setError("Unknown error");
      }
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-gray-300/60"></div>
        <BlueButton text="Sign in" className="absolute m-4 top-2 right-2" onClick={goToLogin}/>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6">Register</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-zinc-400"
              id="name"
              type="text"
              placeholder="name"
              onChange={(e) =>
                setName(
                  e.target.value
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")
                )
              } // Corrigir
            />
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-zinc-400"
              id="email"
              type="email"
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-zinc-400"
              id="password"
              type="password"
              placeholder="******************"
              onChange={(e) => setPassword(e.target.value)}
            />
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>
          <div className="flex items-center gap-20 w-full">
            <BlueButton text="Register" onClick={handleLogin} />
            {loading && (
              <div className="p-3 border-r border-gray-800 rounded-full animate-spin relative "></div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
