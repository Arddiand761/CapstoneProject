import React from "react";
import { Home, Target, CreditCard, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const menuItems = [
  { name: 'Dashboard', icon: <Home size={18} />, path: '/' },
  { name: 'Budget & Goals', icon: <Target size={18} />, path: '/goals' },
  { name: 'Transaksi', icon: <CreditCard size={18} />, path: '/transaksi' },
  { name: 'Pengaturan', icon: <Settings size={18} />, path: '/pengaturan' },
];

const Sidebar = () =>{
     const location = useLocation();
    return (
          <div className="w-60 h-screen bg-green-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-green-800">Dashboard</div>

      {/* Profile Icon Placeholder */}
      <div className="flex justify-center items-center py-6 border-b border-green-800">
        <div className="w-16 h-16 bg-white rounded-full" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-2 mt-6">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all ${
              location.pathname === item.path
                ? 'bg-white text-green-900 font-semibold'
                : 'hover:bg-green-800'
            }`}
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
    )
}


export default Sidebar;