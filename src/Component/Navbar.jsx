import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/images/credflow.png";
import { Link } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [loanOpen, setLoanOpen] = useState(false);
  const [resourceOpen, setResourceOpen] = useState(false);

  return (
    <header className="bg-black fixed w-full z-50 border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-20">

          {/* 🔥 Bigger Logo */}
         <div className="flex items-center h-32">
  <img 
    src={logo} 
    alt="CREDFlow Logo" 
    className="h-40 w-auto object-contain drop-shadow-2xl mt-3 "
  />
</div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center space-x-10 font-medium text-blue-400 relative">

            {/* Loans Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLoanOpen(!loanOpen)}
                className="flex items-center hover:text-green-400 transition duration-300"
              >
                Loans <ChevronDown size={16} className="ml-1" />
              </button>

              {loanOpen && (
                <div className="absolute mt-4 w-52 bg-black border border-gray-700 shadow-xl rounded-lg py-3">
                  <a href="#" className="block px-4 py-2 hover:bg-green-900 hover:text-green-400">
                    Personal Loans
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-900 hover:text-green-400">
                    Debt Consolidation
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-green-900 hover:text-green-400">
                    Credit Check
                  </a>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-green-400 transition duration-300">
              How It Works
            </a>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={() => setResourceOpen(!resourceOpen)}
                className="flex items-center hover:text-green-400 transition duration-300"
              >
                Resources <ChevronDown size={16} className="ml-1" />
              </button>

              {resourceOpen && (
                <div className="absolute mt-4 w-52 bg-black border border-gray-700 shadow-xl rounded-lg py-3">
                  <a href="#" className="block px-4 py-2 hover:bg-blue-900 hover:text-blue-400">
                    Rates & Fees
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-blue-900 hover:text-blue-400">
                    FAQ
                  </a>
                  <a href="#" className="block px-4 py-2 hover:bg-blue-900 hover:text-blue-400">
                    Blog
                  </a>
                </div>
              )}
            </div>

            <a href="#" className="hover:text-green-400 transition duration-300">
              Contact
            </a>
          </nav>

          {/* Right Buttons */}
          <div className="hidden md:flex items-center space-x-5">
            <Link to="/login">
            <button className="border border-blue-500 text-blue-400 px-5 py-2 rounded-full font-medium hover:bg-blue-900 hover:text-white transition">
              Sign In
            </button>
          </Link>
           <Link to="/signup">
            <button className="bg-gradient-to-r from-blue-600 to-green-500 text-white px-7 py-2 rounded-full font-semibold shadow-lg hover:scale-105 transition duration-300">
              Signup
            </button>
            </Link>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X size={28} className="text-green-400" />
              ) : (
                <Menu size={28} className="text-blue-400" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black px-6 py-6 space-y-4 border-t border-gray-800">
          <a href="#" className="block text-blue-400 hover:text-green-400">Personal Loans</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">Debt Consolidation</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">Credit Check</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">How It Works</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">Rates & Fees</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">FAQ</a>
          <a href="#" className="block text-blue-400 hover:text-green-400">Contact</a>

          <button className="w-full border border-blue-500 text-blue-400 py-2 rounded-full">
            Sign In
          </button>

          <button className="w-full bg-gradient-to-r from-blue-600 to-green-500 text-white py-2 rounded-full font-semibold">
            Signup
          </button>
        </div>
      )}
    </header>
  );
}

export default Navbar;