import React from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    // Left Session
    <div className="min-h-screen flex">
      {/*leftside*/}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8">
        <div className="mb-8">
          <img src="assets/SecondaryLogo.svg" alt="Logo" className="h-40" />
        </div>

        <form className="w-full max-w-sm space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium">Username</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium">
              Email Addres
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
              placeholder="************"
            />
          </div>

          <button className="w-full bg-green-700 hover:bg-green-800 text-white py-2 rounded">
            Register
          </button>

          <div className="text-center text-gray-500 text-sm">
            or sign in with
          </div>

          <button className="w-full flex items-center justify-center border rounded py-2 hover:bg-gray-100">
            <FcGoogle className="text-xl mr-2" />
            Continue With Google
          </button>

          <div className="text-center text-gray-500 text-sm">
            Alredy have a Account? <span className="text-sm text-green-700"><a href="">Log in</a></span>
          </div>
        </form>
      </div>


      {/*Right Side*/}

      <div></div>
    </div>
  );
};

export default Register;
