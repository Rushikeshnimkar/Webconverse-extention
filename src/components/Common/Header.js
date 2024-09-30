import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

function Header() {
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-blue-600 text-white shadow-md relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold transform hover:scale-105 transition duration-300">WebConverse</Link>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="focus:outline-none transform hover:scale-110 transition duration-300">
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"/>
              </svg>
            </button>
          </div>
          <nav className="hidden md:block">
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-blue-200 transition duration-300 transform hover:translate-y-[-2px]">Home</Link></li>
              <li><Link to="/discussion" className="hover:text-blue-200 transition duration-300 transform hover:translate-y-[-2px]">Discussion</Link></li>
              {user && (
                <>
                  <li><Link to="/profile" className="hover:text-blue-200 transition duration-300 transform hover:translate-y-[-2px]">Profile</Link></li>
                  <li>
                    <button 
                      onClick={signOut} 
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
                    >
                      Sign Out
                    </button>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </div>
      <div 
        className={`absolute top-16 right-0 w-1/3 md:hidden bg-black bg-opacity-40 backdrop-blur-sm shadow-md z-50 transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
        }`}
      >
        <nav className="container mx-auto px-4 py-2">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="block hover:text-blue-200 transition duration-300 py-2 transform hover:translate-x-2" onClick={toggleMenu}>Home</Link></li>
            <li><Link to="/discussion" className="block hover:text-blue-200 transition duration-300 py-2 transform hover:translate-x-2" onClick={toggleMenu}>Discussion</Link></li>
            {user && (
              <>
                <li><Link to="/profile" className="block hover:text-blue-200 transition duration-300 py-2 transform hover:translate-x-2" onClick={toggleMenu}>Profile</Link></li>
                <li>
                  <button 
                    onClick={() => { signOut(); toggleMenu(); }}
                    className="w-full text-left bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
                  >
                    Sign Out
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;