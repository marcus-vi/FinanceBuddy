import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate("/register", { state: { email } });
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-blue-500  relative">
      <header className="absolute top-0 left-0 w-full flex justify-between items-center p-6 shadow text-white">
        <div
          className="flex gap-4 items-center cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="h-[40px] w-[40px]" />
          <h1 className="text-2xl font-bold">FINANCEBUDDY</h1>
        </div>
        <div className="flex gap-6">
          <a className="hover:underline cursor-pointer">Soluções</a>
          <a className="hover:underline cursor-pointer">Preços</a>
          <a className="hover:underline cursor-pointer">Sobre nós</a>
          <a className="hover:underline cursor-pointer">Desenvolvedores</a>
        </div>
        <div>
          <button
            className="border border-white px-4 py-2 rounded-full cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Acessar minha conta
          </button>
          <button
            className="bg-white text-blue-900 px-4 py-2 rounded-full ml-4 cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Criar conta grátis
          </button>
        </div>
      </header>

      <div className="flex items-center justify-between w-4/5">
        <div className="text-white max-w-lg">
          <h2 className="text-4xl font-bold mb-4">
            Gerencie suas transações com rapidez e eficiência
          </h2>
          <p className="mb-6">
            Gerencie suas finanças, acompanhe sua taxa de faturamento, controle
            seus gastos e impulsione seu crescimento financeiro. Tudo em um só
            lugar.
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h3 className="text-xl font-bold mb-4 text-gray-800">
            Cadastre-se agora!
          </h3>
          <form onSubmit={handleClick}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              E-mail
            </label>
            <input
              type="email"
              className="w-full border p-2 rounded mb-4"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="bg-blue-600 text-white w-full py-2 rounded cursor-pointer">
              Criar conta grátis
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4">
            Ao clicar você aceita receber nossas comunicações, conforme{" "}
            <a href="" className="underline">
              Política de Privacidade
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
