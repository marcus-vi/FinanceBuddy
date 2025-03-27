import { useState } from "react";
import axios from "axios";
import BlueButton from "../components/BlueButton";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import grafico from "../assets/grafico.png";
import { X } from 'lucide-react';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const goToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!email.includes("@")) {
      setError("Email does not contain @");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      }
    } catch (error) {
      if (error?.response?.status === 400) {
        setError("Please fill in all fields");
      } else if (!error?.response) {
        setError("Error accessing the server");
      } else if (error.response.status === 404) {
        setError("Invalid email or password");
      } else {
        setError("Unknown error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col w-full bg-gray-100">
      <header className="flex justify-between items-center px-6 py-5 shadow bg-gradient-to-r text-white bg-blue-800 to-blue-600">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <img src={logo} alt="logo" className="h-[40px] w-[40px]" />
          <h1 className="text-2xl font-bold">FINANCEBUDDY</h1>
        </div>
        <div className="flex gap-6 items-center">
        <BlueButton
          text="Register"
          onClick={goToRegister}
        />
        <X onClick={() => navigate("/home")} className="cursor-pointer"/>
        </div>
      </header>

      <div className="md:flex items-center  w-screen h-full bg-gray-100">
        <div className="md:w-1/2 h-full relative flex flex-col gap-4 justify-center md:px-28 md:py-20  px-6 py-10">
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
      <div className="bg-white h-full md:w-1/2 flex flex-col justify-center items-center px-6 py-10">
                <div className="max-w-lg mt-18">
                  <h2 className="text-3xl mb-4 text-blue-800 font-semibold">Seja bem-vindo de volta ao Financebuddy!</h2>
                  <p className="text-gray-800">uma plataforma completa para gerenciar suas finanças com praticidade, segurança e todos os benefícios que só o nosso sistema pode oferecer!</p>
                </div>
                <img src={grafico} alt="" />
              </div>
      </div>
    </div>
  );
}

export default Login;
