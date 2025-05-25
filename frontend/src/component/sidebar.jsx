import React from "react";
import { User, Home, Target, CreditCard, Settings, LogOut } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuItems = [
    { name: "Profile", icon: <User size={18} />, path: "/profile" },
    { name: "Dashboard", icon: <Home size={18} />, path: "/home" },
    { name: "Budget & Goals", icon: <Target size={18} />, path: "/goals" },
    { name: "Transaksi", icon: <CreditCard size={18} />, path: "/transaksi" },
    { name: "Pengaturan", icon: <Settings size={18} />, path: "/pengaturan" },
  ];

  return (
    <aside className="w-64 bg-emerald-900 text-white p-6 space-y-6 fixed h-full left-0 top-0 z-10 shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-8">
        <img 
          src="SecondaryLogo.svg" 
          alt="BudgetEase Logo" 
          className="h-8 w-8"
          onError={(e) => e.target.src='https://placehold.co/32x32/10b981/ffffff?text=BE'}
        />
        <div className="text-xl font-bold">BudgetEase</div>
      </div>

      {/* Menu Items */}
      <nav className="space-y-2">
        {menuItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-emerald-800 ${
              location.pathname === item.path ? "bg-emerald-800 border-r-4 border-emerald-400" : ""
            }`}
          >
            {item.icon}
            <span className="font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-red-600 bg-red-500 w-full"
        >
          <LogOut size={18} />
          <span className="font-medium">Log Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;