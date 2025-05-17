import React from "react";

function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#bc5436]">
      <div className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-8">Login</h2>
        <form>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-2">
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
            />
          </div>
          <div className="mb-6 flex justify-between items-center text-sm">
            <span>
              Belum punya akun?{" "}
              <a href="#" className="text-red-500 hover:underline">
                Daftar dulu
              </a>
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-lg shadow-md transition mb-4"
          >
            LOGIN
          </button>
        </form>
        <div className="text-center text-gray-500 text-sm mt-2">
          <a href="#" className="hover:underline">
            Lupa Password?
          </a>
        </div>
      </div>
    </div>
  );
}

export default Login;
