import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun } from 'lucide-react';
import { useDarkMode } from '../contexts/useDarkMode';

export default function Navbar() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Run Model', path: '/run-model' },
    { name: 'Architecture', path: '/architecture' },
    { name: 'About', path: '/about' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full bg-white/10 dark:bg-gray-800/10 backdrop-blur-xl border-b border-purple-300/30 dark:border-purple-500/30">
      <div className="w-full px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-16">
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="/images/molecule.png"
                className="w-4 h-4 sm:w-6 sm:h-6 lg:w-6 lg:h-6"
                alt="Molecule"
              />
            </div>
            <span className="text-sm sm:text-xl lg:text-xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent dark:from-purple-400 dark:to-purple-600 hidden sm:block">
              SMART PROTAC
            </span>
          </Link>
          
          <div className="px-2 sm:px-4 lg:px-6 py-1 sm:py-2 lg:py-2">
            <div className="flex items-center space-x-0.5 sm:space-x-1 lg:space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-1 sm:px-2 lg:px-4 py-1 sm:py-2 lg:py-2 rounded-lg text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 ${
                    location.pathname === link.path
                      ? 'bg-purple-500 text-white'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-700 dark:text-gray-300 dark:hover:bg-purple-900/50 dark:hover:text-purple-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <button
            onClick={toggleDarkMode}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-10 lg:h-10 rounded-xl bg-white/80 backdrop-blur-md border border-purple-200/50 dark:bg-gray-800/80 dark:border-purple-500/30 flex items-center justify-center hover:scale-110 transition-all duration-300 flex-shrink-0"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-yellow-500" />
            ) : (
              <Moon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-5 lg:h-5 text-purple-600" />
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}
