import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Sidebar from "./sidebar";

const HomePage = () => {
  const [monthlyData, setMonthlyData] = useState([
    { name: "Jul", value: 300 },
    { name: "Aug", value: 500 },
    { name: "Sep", value: 600 },
    { name: "Oct", value: 850 },
    { name: "Nov", value: 400 },
    { name: "Dec", value: 620 },
    { name: "Jan", value: 750 },
  ]);

  const [compareData, setCompareData] = useState([
    { name: "Week 1", lastMonth: 400, thisMonth: 500 },
    { name: "Week 2", lastMonth: 300, thisMonth: 450 },
    { name: "Week 3", lastMonth: 350, thisMonth: 480 },
    { name: "Week 4", lastMonth: 320, thisMonth: 700 },
  ]);

  const cashIn = [
    {
      date: "11 Mei 2024",
      category: "Pendapatan",
      amount: "IDR 10,000",
      desc: "Transferan bulanan",
    },
    {
      date: "9 Mei 2024",
      category: "Non-cash",
      amount: "IDR 14,000",
      desc: "Hasil Parttime",
    },
    {
      date: "14 Apr 2024",
      category: "Cash",
      amount: "IDR 21,000",
      desc: "Jual Gundam",
    },
  ];

  const cashOut = [
    {
      date: "10 Mei 2024",
      category: "Cash",
      amount: "IDR 10,000",
      desc: "Beli Bahan Masak",
    },
    {
      date: "1 Mei 2024",
      category: "Non-cash",
      amount: "IDR 14,000",
      desc: "Bayar Kos",
    },
    {
      date: "28 Apr 2024",
      category: "Cash",
      amount: "IDR 21,000",
      desc: "Beli Gundam",
    },
  ];

  const goals = [
    { name: "Jordan 11", percent: 90 },
    { name: "Camera Nikon", percent: 43 },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 space-y-6">
        {/* Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">
              Selamat datang kembali! Berikut ringkasan keuangan Anda.
            </p>
          </div>
          <a
            href="/transactionInput"
            className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition-all duration-200"
          >
            + Input Transaksi
          </a>
        </div>

        {/* Top Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Cash</p>
                <p className="text-2xl font-bold text-gray-900">IDR 500,000</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">💵</span>
              </div>
            </div>
            <button className="text-emerald-600 text-sm font-medium mt-3 hover:underline">
              View Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Non-cash</p>
                <p className="text-2xl font-bold text-gray-900">
                  IDR 15,000,000
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">💳</span>
              </div>
            </div>
            <button className="text-emerald-600 text-sm font-medium mt-3 hover:underline">
              View Report
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Income
                </p>
                <p className="text-2xl font-bold text-green-600">IDR 45,000</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">📈</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Expense
                </p>
                <p className="text-2xl font-bold text-red-600">IDR 45,000</p>
              </div>
              <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                <span className="text-red-600 text-xl">📉</span>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Grafik Bulanan */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Grafik Bulanan
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                />
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Grafik Pembanding */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Grafik Pembanding
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={compareData}>
                <Line
                  type="monotone"
                  dataKey="lastMonth"
                  stroke="#06b6d4"
                  strokeWidth={3}
                  name="Bulan Lalu"
                />
                <Line
                  type="monotone"
                  dataKey="thisMonth"
                  stroke="#10b981"
                  strokeWidth={3}
                  name="Bulan Ini"
                />
                <CartesianGrid stroke="#f3f4f6" strokeDasharray="3 3" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
            <div className="text-sm text-gray-600 mt-4 p-3 bg-gray-50 rounded-lg">
              Bulan lalu: <span className="font-semibold">IDR 3,004,000</span> |
              Bulan ini: <span className="font-semibold">IDR 4,504,000</span>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-6 text-gray-900">Goals</h2>
          <div className="space-y-4">
            {goals.map((goal, idx) => (
              <div key={idx} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-900">{goal.name}</span>
                  <span className="text-sm font-semibold text-emerald-600">
                    {goal.percent}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${goal.percent}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cash In & Cash Out */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Cash In
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Tanggal
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Rupiah
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cashIn.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-gray-900">{item.date}</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-semibold text-green-600">
                        {item.amount}
                      </td>
                      <td className="py-3 px-2 text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">
              Cash Out
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Tanggal
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Rupiah
                    </th>
                    <th className="text-left py-3 px-2 font-medium text-gray-600">
                      Keterangan
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cashOut.map((item, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-2 text-gray-900">{item.date}</td>
                      <td className="py-3 px-2">
                        <span className="inline-flex px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">
                          {item.category}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-semibold text-red-600">
                        {item.amount}
                      </td>
                      <td className="py-3 px-2 text-gray-600">{item.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
