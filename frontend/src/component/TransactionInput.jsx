/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Navbar from "./sidebar";

const BASE_URL = "https://backendhapi-production.up.railway.app"; // Railway API URL

const CategoryIconPlaceholder = ({ name, isActive, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 p-2 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out transform hover:scale-105
      ${
        isActive
          ? "bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500 ring-offset-1"
          : "bg-white hover:bg-emerald-50 text-gray-700 border-gray-300"
      }`}
  >
    <div
      className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center mb-1 text-lg sm:text-xl
      ${isActive ? "bg-emerald-700" : "bg-gray-200"}
    `}
    >
      {name.substring(0, 1)}
    </div>
    <span
      className={`text-xs sm:text-sm font-medium text-center ${
        isActive ? "text-white" : "text-gray-600"
      }`}
    >
      {name}
    </span>
  </button>
);

const TransactionInputPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [transactionType, setTransactionType] = useState("EXPENSE"); // 'INCOME' or 'EXPENSE' - sesuai API
  const [title, setTitle] = useState(""); // Tambah field title
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // Optional category
  const [transactionDate, setTransactionDate] = useState(""); // Tambah field date
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" }); // Success/error message

  // Category sesuai dengan yang ada di backend atau bisa kosong untuk auto-detect
  const categories = [
    { id: "food", name: "Food" },
    { id: "transport", name: "Transport" },
    { id: "shopping", name: "Shopping" },
    { id: "entertainment", name: "Entertainment" },
    { id: "bills", name: "Bills" },
    { id: "health", name: "Health" },
    { id: "education", name: "Education" },
    { id: "investment", name: "Investment" },
    { id: "salary", name: "Salary" },
    { id: "business", name: "Business" },
    { id: "gift", name: "Gift" },
    { id: "other", name: "Lain-lain" },
  ];

  useEffect(() => {
    setIsMounted(true);
    // Set default date to today
    const today = new Date().toISOString().split("T")[0];
    setTransactionDate(today);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Hanya izinkan angka dan satu titik desimal
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Function to save transaction to Railway API
  const saveTransactionToAPI = async (transactionData) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login ulang.");
      }

      console.log("Sending transaction data:", transactionData);

      const response = await fetch(`${BASE_URL}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(transactionData),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (!response.ok) {
        throw new Error(
          data.error || data.message || "Gagal menyimpan transaksi"
        );
      }

      return data;
    } catch (error) {
      console.error("Error saving transaction:", error);
      throw error;
    }
  };

  const handleSaveTransaction = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    // Validasi
    if (!title.trim()) {
      setMessage({ type: "error", text: "Judul transaksi wajib diisi." });
      setIsLoading(false);
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: "Jumlah harus lebih dari 0." });
      setIsLoading(false);
      return;
    }

    if (!transactionDate) {
      setMessage({ type: "error", text: "Tanggal transaksi wajib diisi." });
      setIsLoading(false);
      return;
    }

    // Prepare data sesuai format API
    const transactionData = {
      title: title.trim(),
      amount: parseFloat(amount),
      type: transactionType, // "INCOME" atau "EXPENSE"
      transaction_date: transactionDate, // Format: "2025-06-11"
    };

    // Tambahkan category jika dipilih (optional)
    if (selectedCategory) {
      transactionData.category = selectedCategory;
    }

    try {
      const result = await saveTransactionToAPI(transactionData);

      // Success
      setMessage({
        type: "success",
        text: `Transaksi ${
          transactionType === "INCOME" ? "pemasukan" : "pengeluaran"
        } sebesar Rp ${parseFloat(amount).toLocaleString(
          "id-ID"
        )} berhasil disimpan!`,
      });

      // Reset form
      setTitle("");
      setAmount("");
      setSelectedCategory("");
      const today = new Date().toISOString().split("T")[0];
      setTransactionDate(today);

      // Auto-hide success message after 5 seconds
      setTimeout(() => {
        setMessage({ type: "", text: "" });
      }, 5000);
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Gagal menyimpan transaksi. Silakan coba lagi.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* MAIN CONTAINER - FIXED MOBILE PADDING */}
      <main
        className={`pt-16 pb-24 sm:pt-20 sm:pb-8 lg:pt-24 max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6 transition-opacity duration-700 ease-in-out ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* HEADER - MOBILE RESPONSIVE */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-4 sm:mb-6 lg:mb-8 text-center sm:text-left">
          Input Transaksi Baru
        </h1>

        {/* Success/Error Message - MOBILE RESPONSIVE */}
        {message.text && (
          <div
            className={`p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 mx-1 sm:mx-0 ${
              message.type === "success"
                ? "bg-green-50 border border-green-200 text-green-800"
                : "bg-red-50 border border-red-200 text-red-800"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                {message.type === "success" ? (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-green-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    />
                  </svg>
                ) : (
                  <svg
                    className="h-4 w-4 sm:h-5 sm:w-5 text-red-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    />
                  </svg>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium break-words">
                  {message.text}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* FORM CONTAINER - MOBILE RESPONSIVE */}
        <form
          onSubmit={handleSaveTransaction}
          className={`bg-white rounded-xl shadow-xl p-4 sm:p-6 lg:p-8 mx-1 sm:mx-0 transition-all duration-500 ease-in-out ${
            isMounted
              ? "transform scale-100 opacity-100"
              : "transform scale-95 opacity-0"
          }`}
        >
          {/* FORM FIELDS - MOBILE OPTIMIZED GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-6 sm:mb-8">
            {/* Transaction Type - MOBILE RESPONSIVE */}
            <div className="lg:col-span-2">
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
                Jenis Transaksi
              </label>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => setTransactionType("INCOME")}
                  className={`flex-1 py-3 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm lg:text-base font-medium border-2 transition-all duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 touch-manipulation
                  ${
                    transactionType === "INCOME"
                      ? "bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Pemasukan (Income)
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType("EXPENSE")}
                  className={`flex-1 py-3 sm:py-3 px-3 sm:px-4 rounded-lg text-xs sm:text-sm lg:text-base font-medium border-2 transition-all duration-200 ease-in-out transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1 touch-manipulation
                  ${
                    transactionType === "EXPENSE"
                      ? "bg-red-500 text-white border-red-600 focus:ring-red-400"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Pengeluaran (Expense)
                </button>
              </div>
            </div>

            {/* Title - MOBILE RESPONSIVE */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Judul Transaksi *
              </label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-3 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm touch-manipulation"
                placeholder="Contoh: Makan siang, Gaji bulanan, dll."
                required
              />
            </div>

            {/* Amount - MOBILE RESPONSIVE */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Jumlah *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm sm:text-base">Rp</span>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full border border-gray-300 rounded-lg pl-12 sm:pl-14 pr-3 py-3 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm touch-manipulation"
                  placeholder="0"
                  required
                />
              </div>
              {amount && (
                <p className="text-xs sm:text-sm text-gray-500 mt-1 break-words">
                  {parseFloat(amount || 0).toLocaleString("id-ID")} Rupiah
                </p>
              )}
            </div>

            {/* Transaction Date - MOBILE RESPONSIVE */}
            <div className="lg:col-span-2">
              <label
                htmlFor="transactionDate"
                className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Tanggal Transaksi *
              </label>
              <input
                type="date"
                name="transactionDate"
                id="transactionDate"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
                className="w-full sm:w-auto border border-gray-300 rounded-lg px-3 py-3 sm:py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm touch-manipulation"
                required
              />
            </div>
          </div>

          {/* Categories Section - MOBILE OPTIMIZED */}
          <div className="mb-6 sm:mb-8">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
              Kategori (Opsional)
              <span className="text-xs text-gray-500 font-normal ml-2 block sm:inline">
                Kosongkan untuk deteksi otomatis
              </span>
            </label>

            {/* MOBILE SCROLLABLE CATEGORIES */}
            <div className="overflow-x-auto -mx-1 px-1">
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 lg:gap-4 min-w-[300px] sm:min-w-0">
                {/* Reset Category Button - MOBILE OPTIMIZED */}
                <button
                  type="button"
                  onClick={() => setSelectedCategory("")}
                  className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-1 sm:p-2 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out transform active:scale-95 touch-manipulation
                    ${
                      selectedCategory === ""
                        ? "bg-gray-600 text-white border-gray-700 ring-2 ring-gray-500 ring-offset-1"
                        : "bg-white hover:bg-gray-50 text-gray-700 border-gray-300"
                    }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mb-1 text-sm sm:text-lg lg:text-xl
                    ${selectedCategory === "" ? "bg-gray-700" : "bg-gray-200"}
                  `}
                  >
                    ✨
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                      selectedCategory === "" ? "text-white" : "text-gray-600"
                    }`}
                  >
                    Auto
                  </span>
                </button>

                {/* Category Buttons - MOBILE OPTIMIZED */}
                {categories.map((category) => (
                  <button
                    key={category.id}
                    type="button"
                    onClick={() => setSelectedCategory(category.name)}
                    className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 p-1 sm:p-2 border rounded-lg shadow-sm cursor-pointer transition-all duration-200 ease-in-out transform active:scale-95 touch-manipulation
                      ${
                        selectedCategory === category.name
                          ? "bg-emerald-600 text-white border-emerald-700 ring-2 ring-emerald-500 ring-offset-1"
                          : "bg-white hover:bg-emerald-50 text-gray-700 border-gray-300"
                      }`}
                  >
                    <div
                      className={`w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center mb-1 text-sm sm:text-lg lg:text-xl
                      ${
                        selectedCategory === category.name
                          ? "bg-emerald-700"
                          : "bg-gray-200"
                      }
                    `}
                    >
                      {category.name.substring(0, 1)}
                    </div>
                    <span
                      className={`text-xs sm:text-sm font-medium text-center leading-tight ${
                        selectedCategory === category.name
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                    >
                      {category.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Save Button - MOBILE RESPONSIVE */}
          <div className="flex justify-center sm:justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 sm:py-3 px-6 sm:px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform active:scale-95 touch-manipulation
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Menyimpan...
                </div>
              ) : (
                "Simpan Transaksi"
              )}
            </button>
          </div>

          {/* Info Tips - MOBILE RESPONSIVE */}
          <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 mt-0.5">
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm text-blue-700 break-words">
                  <strong>Tips:</strong> Kategori tidak wajib diisi. Jika
                  dikosongkan, sistem akan melakukan kategorisasi otomatis
                  berdasarkan judul transaksi.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Bottom Spacing untuk Mobile */}
        <div className="h-4 sm:h-0"></div>
      </main>
    </div>
  );
};

export default TransactionInputPage;
