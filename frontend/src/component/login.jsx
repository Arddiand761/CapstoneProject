import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Route, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@email.com" && password === "admin") {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      alert("invalid");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="mb-8">
          <img src="assets/SecondaryLogo.svg" alt="Logo" className="h-40" />
        </div>

        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="johndoe@email.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="********"
            />
            <div className="text-right text-sm text-green-700 mt-1 cursor-pointer hover:underline">
              Forgot Password?
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              checked={keepSignedIn}
              onChange={() => setKeepSignedIn(!keepSignedIn)}
              className="mr-2"
            />
            <label className="text-sm">Keep me signed in</label>
          </div>

          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded">
            Login
          </button>

          <div className="text-center text-gray-500 text-sm">
            or sign in with
          </div>

          <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100">
            <FcGoogle className="text-xl mr-2" />
            Continue with Google
          </button>

          <div className="text-center text-sm text-green-700 mt-4 cursor-pointer hover:underline">
            <a href="/register">Create Account</a>
          </div>
        </form>
      </div>

      {/* Right Side */}
      <div className="hidden md:flex md:w-1/2 bg-gray-100 justify-center items-center">
        <div className="text-center">
          <img
            src="assets/MainLogo.svg"
            alt="Budgetease"
            className="h-120 mx-auto mb-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
