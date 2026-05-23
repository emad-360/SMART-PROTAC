export default function Button({ children, onClick, disabled = false, className = '', variant = 'primary' }) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-300/50 hover:shadow-purple-400/70 hover:scale-105',
    secondary: 'bg-white/80 backdrop-blur-md border border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 dark:bg-gray-800/80 dark:border-purple-500/30 dark:text-purple-400 dark:hover:bg-gray-700/50 dark:hover:border-purple-400/50',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
