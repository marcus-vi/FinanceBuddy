import { useState } from "react";
import axios from "axios";
import BlueButton from "../components/BlueButton"; // Nome correto do componente

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        { name: username, password }, // Enviar objeto diretamente
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      if (error?.response?.status === 400) {
        setError("Preencha todos os campos");
      } else if (!error?.response) {
        setError("Erro ao acessar o servidor");
      } else if (error.response.status === 401) {
        setError("Usuário ou senha inválidos");
      } else {
        setError("Erro desconhecido");
      }
    } finally {
      setLoading(false); // Sempre redefine loading
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="absolute inset-0 bg-gray-300/60"></div> 
        <a href="./register" className="text-white">
          <BlueButton text="Register" className="absolute top-4 right-4" />
        </a>
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
        <h1 className="text-2xl font-bold mb-6">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-zinc-400"
              id="username"
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
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
            <BlueButton
              text="Login"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:bg-blue-800"
              type="button"
              onClick={(e) => handleLogin(e)}
            />            
            {loading && <div className="p-3 border-r border-gray-800 rounded-full animate-spin"></div>}
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
