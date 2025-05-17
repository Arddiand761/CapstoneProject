import React, { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="text-white text-lg font-bold">
          BudgetEase
        </div>
        <div className="md:hidden">
          <button
            className="text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:text-blue-200">Home</a>
          <a href="/about" className="text-white hover:text-blue-200">About</a>
          <a href="/contact" className="text-white hover:text-blue-200">Contact</a>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="mt-2 flex flex-col space-y-2 md:hidden">
          <a href="/" className="text-white hover:text-blue-200">Home</a>
          <a href="/about" className="text-white hover:text-blue-200">About</a>
          <a href="/contact" className="text-white hover:text-blue-200">Contact</a>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
