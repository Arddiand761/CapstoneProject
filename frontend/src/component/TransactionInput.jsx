import React, { useState, useEffect } from "react";
import Navbar from "./sidebar"; // Ganti Sidebar menjadi Navbar jika sudah rename

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
      {/* Di sini Anda bisa menambahkan SVG ikon yang sebenarnya jika ada */}
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
  const [transactionType, setTransactionType] = useState("expense"); // 'income' or 'expense'
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cash"); // 'cash' or 'non-cash'
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    { id: "shop", name: "Shop" },
    { id: "food", name: "Food" },
    { id: "workout", name: "Workout" },
    { id: "housing", name: "Housing" },
    { id: "investment", name: "Investment" },
    { id: "transport", name: "Transport" },
    { id: "holiday", name: "Holiday" },
    { id: "other", name: "Other" },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Hanya izinkan angka dan satu titik desimal (jika diperlukan)
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  const handleSaveTransaction = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Validasi sederhana
    if (!amount || parseFloat(amount) <= 0 || !selectedCategory) {
      alert("Mohon lengkapi jumlah dan pilih kategori.");
      setIsLoading(false);
      return;
    }

    const transactionData = {
      type: transactionType,
      amount: parseFloat(amount),
      category: selectedCategory,
      paymentMethod: paymentMethod,
      date: new Date().toISOString(),
    };

    console.log("Data Transaksi untuk Disimpan:", transactionData);

    // Simulasi penyimpanan
    setTimeout(() => {
      alert(
        `Transaksi ${transactionType} sebesar IDR ${amount} untuk kategori ${selectedCategory} dengan metode pembayaran ${paymentMethod} berhasil disimpan! (Simulasi)`
      );
      // Reset form
      setAmount("");
      setSelectedCategory(null);
      // Anda mungkin ingin mereset transactionType dan paymentMethod ke default juga
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main
        className={`pt-24 max-w-4xl mx-auto px-4 sm:px-8 space-y-6 transition-opacity duration-700 ease-in-out ${
          isMounted ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 sm:mb-8">
          Input Transaksi Baru
        </h1>

        <form
          onSubmit={handleSaveTransaction}
          className={`bg-white rounded-xl shadow-xl p-6 sm:p-8 transition-all duration-500 ease-in-out ${
            isMounted
              ? "transform scale-100 opacity-100"
              : "transform scale-95 opacity-0"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {/* Transaction Type */}
            <div>
              <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
                Jenis Transaksi
              </label>
              <div className="flex space-x-2 sm:space-x-3">
                <button
                  type="button"
                  onClick={() => setTransactionType("income")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm sm:text-base font-medium border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${
                    transactionType === "income"
                      ? "bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Pemasukan (Income)
                </button>
                <button
                  type="button"
                  onClick={() => setTransactionType("expense")}
                  className={`flex-1 py-3 px-4 rounded-lg text-sm sm:text-base font-medium border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${
                    transactionType === "expense"
                      ? "bg-red-500 text-white border-red-600 focus:ring-red-400" // Warna berbeda untuk expense
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Pengeluaran (Expense)
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label
                htmlFor="amount"
                className="block text-sm sm:text-base font-semibold text-gray-700 mb-2"
              >
                Jumlah
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 sm:pl-4 flex items-center pointer-events-none">
                  <span className="text-gray-500 text-sm sm:text-base">
                    IDR
                  </span>
                </div>
                <input
                  type="text"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="w-full border border-gray-300 rounded-lg pl-12 sm:pl-14 pr-3 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
                  placeholder="0"
                  required
                />
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-3">
              Kategori
            </label>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 gap-3 sm:gap-4 min-w-[400px]">
                {categories.map((category) => (
                  <CategoryIconPlaceholder
                    key={category.id}
                    name={category.name}
                    isActive={selectedCategory === category.name}
                    onClick={() => setSelectedCategory(category.name)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="mb-10">
            <label className="block text-sm sm:text-base font-semibold text-gray-700 mb-2">
              Metode Pembayaran
            </label>
            <div className="flex justify-center">
              <div className="flex space-x-2 sm:space-x-3 w-full md:w-auto max-w-md md:max-w-none">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cash")}
                  className={`flex-1 md:flex-initial md:w-40 py-3 px-4 rounded-lg text-sm sm:text-base font-medium border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${
                    paymentMethod === "cash"
                      ? "bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Tunai (Cash)
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod("non-cash")}
                  className={`flex-1 md:flex-initial md:w-40 py-3 px-4 rounded-lg text-sm sm:text-base font-medium border-2 transition-all duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-1
                  ${
                    paymentMethod === "non-cash"
                      ? "bg-emerald-600 text-white border-emerald-700 focus:ring-emerald-500"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 focus:ring-emerald-400"
                  }`}
                >
                  Non-Tunai (Non-Cash)
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 sm:py-3 sm:px-8 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 ease-in-out transform hover:scale-105
              ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
            `}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
        </form>
      </main>
    </div>
  );
};

export default TransactionInputPage;
