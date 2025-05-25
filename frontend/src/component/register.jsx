import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import yang benar


// import { FcGoogle } from "react-icons/fc"; // Dihapus, akan diganti dengan SVG inline


// --- AKHIR BAGIAN NAVIGASI ---

// Komponen SVG untuk ikon Google sebagai pengganti FcGoogle
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
    <path d="M1 1h22v22H1z" fill="none" />
  </svg>
);

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate(); 

  useEffect(() => {
    // Animasi fade-in untuk form saat komponen dimuat
    setShowForm(true);
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Password dan konfirmasi password tidak cocok.");
      setIsLoading(false);
      return;
    }

    // Simulasi panggilan API untuk registrasi
    setTimeout(() => {
      if (username && email && password) {
        // localStorage.setItem("user", JSON.stringify({ username, email })); // localStorage mungkin tidak berfungsi di semua iframe/sandbox
        console.log("Registrasi berhasil untuk:", { username, email });
        navigate("/introduction"); // Arahkan ke halaman introduction setelah registrasi
      } else {
        setError("Mohon lengkapi semua kolom registrasi.");
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    console.log("Registrasi/Login dengan Google (simulasi)");
    // Logika untuk Google Sign-In/Sign-Up akan ada di sini
  };
  
  const handleLoginRedirect = () => {
    console.log("Ke halaman Login (simulasi)");
    navigate("/"); // Asumsi halaman login ada di root path
  };


  return (
    // Mengembalikan skema warna ke hijau/teal seperti halaman Login
    <div className="min-h-screen flex bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 font-sans">
      {/* Left Side - Register Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 sm:p-8 transition-all duration-1000 ease-in-out" style={{ opacity: showForm ? 1 : 0, transform: showForm ? 'translateY(0)' : 'translateY(20px)' }}>
        <div className="mb-8 text-center">
          <img
            src="SecondaryLogo.svg" // Warna logo disesuaikan kembali
            alt="Logo Sekunder BudgetEase"
            className="h-30 md:h-24 mx-auto transition-transform duration-300 hover:scale-105"
            onError={(e) => e.target.src='https://placehold.co/200x80/cccccc/000000?text=Logo+Error'}
          />
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-700 mt-4"> {/* Warna heading disesuaikan */}
            Buat Akun Baru
          </h1>
          <p className="text-gray-600 mt-2">
            Bergabunglah dengan BudgetEase dan mulai kelola keuangan Anda.
          </p>
        </div>

        <form
          className="w-full max-w-md space-y-5 bg-white p-8 rounded-xl shadow-2xl"
          onSubmit={handleRegister}
        >
          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md transition-all duration-300 ease-in-out" role="alert">
              <p className="font-semibold">Oops! Terjadi Kesalahan</p>
              <p>{error}</p>
            </div>
          )}

          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-300" // Warna ring disesuaikan
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label
              htmlFor="email-register"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Alamat Email
            </label>
            <input
              id="email-register"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-300" // Warna ring disesuaikan
              placeholder="contoh@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password-register"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password-register"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-300" // Warna ring disesuaikan
              placeholder="•••••••• (minimal 8 karakter)"
              required
              minLength={8}
            />
          </div>
           <div>
            <label
              htmlFor="confirmPassword"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Konfirmasi Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-shadow duration-300" // Warna ring disesuaikan
              placeholder="••••••••"
              required
              minLength={8}
            />
          </div>


          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-emerald-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105 ${ // Warna tombol disesuaikan
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Mendaftar...
              </div>
            ) : (
              "Register"
            )}
          </button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">
                atau daftar dengan
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <GoogleIcon className="w-6 h-6 mr-3" />
            <span className="text-sm font-medium text-gray-700">
              Lanjutkan dengan Google
            </span>
          </button>

          <div className="text-center text-sm text-gray-600 mt-6">
            Sudah punya akun?{""}
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="font-medium text-emerald-600 hover:text-emerald-800 hover:underline transition-colors duration-300" // Warna link disesuaikan
            >
              Masuk di sini
            </button>
          </div>
        </form>
      </div>

      {/* Right Side - Image/Branding */}
      {/* Mengembalikan skema warna ke hijau/teal seperti halaman Login */}
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-tr from-emerald-600 to-teal-400 justify-center items-center p-8 lg:p-12 relative overflow-hidden">
         <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="smallGridRegister" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5"/>
                    </pattern>
                    <pattern id="gridRegister" width="100" height="100" patternUnits="userSpaceOnUse">
                        <rect width="100" height="100" fill="url(#smallGridRegister)"/>
                        <path d="M 100 0 L 0 0 0 100" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#gridRegister)" />
            </svg>
        </div>
        <div className="text-center z-10 transition-all duration-1000 ease-in-out" style={{ opacity: showForm ? 1 : 0, transform: showForm ? 'scale(1)' : 'scale(0.95)' }}>
          <img
            src="MainLogo.svg" // Warna placeholder disesuaikan
            alt="Ilustrasi Selamat Datang BudgetEase"
            className="max-w-md lg:max-w-lg xl:max-w-xl mx-auto mb-6"
            onError={(e) => e.target.src='https://placehold.co/400x300/cccccc/000000?text=Image+Error'}
          />
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Mulai Perjalanan Finansial Anda
          </h2>
          <p className="text-emerald-100 text-lg lg:text-xl px-4"> {/* Warna teks disesuaikan */}
            Daftar sekarang untuk mendapatkan kontrol penuh atas anggaran dan pengeluaran Anda dengan BudgetEase.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
