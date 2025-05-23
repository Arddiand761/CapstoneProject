import React, {useState, useEffect, Profiler} from "react";
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
import { User, Home, Target, CreditCard, Settings, LogOutIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

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

  const menuItems = [
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
    { name: "Dashboard", icon: <Home size={18} />, path: "#main" },
    { name: "Budget & Goals", icon: <Target size={18} />, path: "/goals" },
    { name: "Transaksi", icon: <CreditCard size={18} />, path: "/transaksi" },
    { name: "Pengaturan", icon: <Settings size={18} />, path: "/pengaturan" },
    { name: "Log Out", icon: <LogOutIcon size={18} />, path: "/" },
  ];

  const cashIn = [
    {
      date: "11 Mei 2024",
      category: "Pendapatan",
      amount: "IDR 10k",
      desc: "Transferan bulanan",
    },
    {
      date: "9 Mei 2024",
      category: "Non-cash",
      amount: "IDR 14",
      desc: "Hasil Parttime",
    },
    {
      date: "14 Apr 2024",
      category: "Cash",
      amount: "IDR 21",
      desc: "Jual Gundam",
    },
  ];

  const cashOut = [
    {
      date: "10 Mei 2024",
      category: "Cash",
      amount: "IDR 10k",
      desc: "Beli Bahan Masak",
    },
    {
      date: "1 Mei 2024",
      category: "Non-cash",
      amount: "IDR 14",
      desc: "Bayar Kos",
    },
    {
      date: "28 Apr 2024",
      category: "Cash",
      amount: "IDR 21",
      desc: "Beli Gundam",
    },
  ];

  const goals = [
    { name: "Jordan 11", percent: 90 },
    { name: "Camera Nikon", percent: 43 },
  ];

  const location = useLocation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-green-900 text-white p-6 space-y-6 fixed h-full">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-y-4">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-2 p-2 rounded hover:bg-green-700 ${
                location.pathname === item.path ? "bg-green-700" : ""
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-6 space-y-10 bg-gray-100" id="main">
        {/* Top Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Cash</p>
            <p className="text-xl font-bold">IDR 500.000</p>
            <a href="#" className="text-blue-500 text-sm">
              View Report
            </a>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Non-cash</p>
            <p className="text-xl font-bold">IDR 15.000.000</p>
            <a href="#" className="text-blue-500 text-sm">
              View Report
            </a>
          </div>
        </div>

        {/* Grafik Bulanan */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Grafik Bulanan</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Grafik Pembanding */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Grafik Pembanding</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={compareData}>
              <Line
                type="monotone"
                dataKey="lastMonth"
                stroke="#06b6d4"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="thisMonth"
                stroke="#10b981"
                strokeWidth={2}
              />
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
          <div className="text-sm text-gray-500 mt-2">
            Bulan lalu: IDR 3.004.00 | Bulan ini: IDR 4.504.00
          </div>
        </div>

        {/* Goals */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Goal</h2>
          {goals.map((goal, idx) => (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span>{goal.name}</span>
                <span>{goal.percent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: `${goal.percent}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Cash In & Cash Out */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Cash In</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th>Tanggal</th>
                  <th>Kategori</th>
                  <th>Rupiah</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {cashIn.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{item.date}</td>
                    <td>{item.category}</td>
                    <td>{item.amount}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-4">Cash Out</h2>
            <table className="w-full text-sm">
              <thead className="text-left text-gray-600">
                <tr>
                  <th>Tanggal</th>
                  <th>Kategori</th>
                  <th>Rupiah</th>
                  <th>Keterangan</th>
                </tr>
              </thead>
              <tbody>
                {cashOut.map((item, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{item.date}</td>
                    <td>{item.category}</td>
                    <td>{item.amount}</td>
                    <td>{item.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
