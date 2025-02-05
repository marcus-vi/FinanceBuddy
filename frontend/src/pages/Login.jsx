import { useState } from "react";
import axios from "axios";
import BlueButton from "../components/BlueButton";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("email does not contain @");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Envio da requisição POST
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password }, // Não precisa de JSON.stringify aqui
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
      } else if (error.response.status === 401) {
        setError("Invalid username or password");
      } else {
        setError("Unknown error");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-gray-300/60"></div>
      <a href="./register" className="text-white">
        <BlueButton text="register" className="absolute m-4 top-2 right-2" />
      </a>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-zinc-400"
              id="email"
              type="text"
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
          <div className="flex items-center justify-between">
            <BlueButton text="Sign In" onClick={handleLogin} />
            {loading && (
              <div className="p-3 border-r border-gray-800 rounded-full animate-spin"></div>
            )}
            <a
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
