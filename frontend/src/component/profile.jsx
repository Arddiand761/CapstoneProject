import React, { useState, useEffect } from "react";
import Sidebar from "./sidebar";

// Placeholder untuk ikon (Anda bisa menggantinya dengan react-icons atau SVG kustom)
const EditIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-4 h-4 text-white"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
    />
  </svg>
);

const ProfileSettings = () => {
  const [activeTab, setActiveTab] = useState("editProfile");
  const [isMounted, setIsMounted] = useState(false);

  const [profileData, setProfileData] = useState({
    yourName: "Astrid Zablonski",
    userName: "Astrid Zablonski",
    email: "h5hrvyst1bre@yahoo.com",
    dateOfBirth: "1990-01-12",
    permanentAddress: "sewon, bantul, yogyakarta",
    city: "Bantul",
    postalCode: "45962",
    country: "Indonesia",
    profilePicture:
      "https://placehold.co/128x128/E0E0E0/757575?text=AZ&font=raleway",
  });

  // Efek untuk animasi mount
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profilePicture: reader.result }));
      };
      reader.readAsDataURL(file);
      console.log("Gambar profil dipilih:", file.name);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Data profil disimpan:", profileData);
    alert("Data profil disimpan! (Simulasi)");
  };

  const getFormattedDate = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split("-");
    const monthNames = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    if (year && month && day) {
      return `${parseInt(day, 10)} ${
        monthNames[parseInt(month, 10) - 1]
      } ${year}`;
    }
    return dateString;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className={`flex-1 ml-64 p-6 sm:p-8 bg-gray-50 transition-opacity duration-500 ease-in-out ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Pengaturan Profile
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-6 sm:mb-8">
            <button
              onClick={() => setActiveTab("editProfile")}
              className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors duration-300
                ${
                  activeTab === "editProfile"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Edit Profile
            </button>
            <button
              onClick={() => setActiveTab("security")}
              className={`py-3 px-4 sm:px-6 text-sm sm:text-base font-medium transition-colors duration-300
                ${
                  activeTab === "security"
                    ? "border-b-2 border-emerald-600 text-emerald-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
            >
              Security
            </button>
          </div>

          {/* Konten Tab */}
          {activeTab === "editProfile" && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture Section */}
              <div className="flex items-center space-x-4 sm:space-x-6 mb-8">
                <div className="relative">
                  <img
                    src={profileData.profilePicture}
                    alt="Profile"
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
                    onError={(e) => {
                      e.target.src =
                        "https://placehold.co/128x128/E0E0E0/FF0000?text=Error&font=raleway";
                    }}
                  />
                  <label
                    htmlFor="profilePictureInput"
                    className="absolute -bottom-1 -right-1 bg-emerald-600 hover:bg-emerald-700 p-2 rounded-full cursor-pointer shadow-md transition-transform duration-200 hover:scale-110"
                    title="Ubah foto profil"
                  >
                    <EditIcon />
                    <input
                      type="file"
                      id="profilePictureInput"
                      name="profilePicture"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-700">
                    {profileData.yourName}
                  </h2>
                  <p className="text-sm text-gray-500">
                    @{profileData.userName}
                  </p>
                </div>
              </div>

              {/* Form Fields Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label
                    htmlFor="yourName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="yourName"
                    id="yourName"
                    value={profileData.yourName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    User Name
                  </label>
                  <input
                    type="text"
                    name="userName"
                    id="userName"
                    value={profileData.userName}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={profileData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="dateOfBirth"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Date of Birth
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="dateOfBirthDisplay"
                      id="dateOfBirthDisplay"
                      value={getFormattedDate(profileData.dateOfBirth)}
                      readOnly
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm appearance-none pr-8 cursor-pointer"
                      onClick={() =>
                        document.getElementById("dateOfBirth").click()
                      }
                    />
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      value={profileData.dateOfBirth}
                      onChange={handleInputChange}
                      className="absolute opacity-0 w-full h-full top-0 left-0 cursor-pointer"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="permanentAddress"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Permanent Address
                  </label>
                  <input
                    type="text"
                    name="permanentAddress"
                    id="permanentAddress"
                    value={profileData.permanentAddress}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    value={profileData.city}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div>
                  <label
                    htmlFor="postalCode"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    value={profileData.postalCode}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    id="country"
                    value={profileData.country}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                  />
                </div>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-300 transform hover:scale-105"
                >
                  Save Changes
                </button>
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">
                Pengaturan Keamanan
              </h3>
              <p className="text-gray-600 text-sm">
                Kelola password dan pengaturan keamanan akun Anda.
              </p>

              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="currentPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password Saat Ini
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                    placeholder="********"
                  />
                </div>
                <div>
                  <label
                    htmlFor="newPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password Baru
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                    placeholder="********"
                  />
                </div>
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Konfirmasi Password Baru
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full md:w-1/2 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm text-sm"
                    placeholder="********"
                  />
                </div>

                <div className="flex justify-start pt-4">
                  <button
                    type="button"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-colors duration-300 transform hover:scale-105"
                  >
                    Update Password
                  </button>
                </div>
              </form>

              {/* Two-Factor Authentication Section */}
              <div className="border-t pt-6 mt-6">
                <h4 className="text-md font-medium text-gray-900 mb-3">
                  Autentikasi Dua Faktor
                </h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Aktifkan 2FA
                    </p>
                    <p className="text-xs text-gray-500">
                      Tingkatkan keamanan akun dengan autentikasi dua faktor
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;
