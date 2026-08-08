import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const navLinks = [
    { name: "Overview", path: "/dashboard" },
    { name: "Accounts & Cards", path: "/accounts" },
    { name: "Wire Transfer", path: "/transfer" },
    { name: "Ledger Logs", path: "/transactions" },
    { name: "Security & API", path: "/profile" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-30 w-full t-nav px-6 py-2.5 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link to="/dashboard" className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg t-btn-primary font-black text-sm flex items-center justify-center shadow-sm">
            L
          </div>
          <div>
            <div className="font-bold text-sm t-text tracking-tight leading-tight">
              LEDGER <span className="t-text-3 font-normal">ENTERPRISE</span>
            </div>
            <div className="text-[9px] font-mono t-text-3 uppercase tracking-widest">Vault OS v2.4</div>
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-md text-xs font-medium ${
                  isActive ? "t-nav-active" : "t-nav-item"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center space-x-3">
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg t-btn-secondary text-xs"
          title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {theme === "dark" ? (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>

        <div className="hidden sm:flex items-center space-x-2 px-2.5 py-1 rounded-md t-btn-secondary text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          <span className="t-text">NODE #8921 ONLINE</span>
        </div>

        <Link
          to="/profile"
          className="flex items-center space-x-2 px-2.5 py-1.5 rounded-md t-btn-secondary text-xs"
        >
          <div className="w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] font-bold text-white">
            PK
          </div>
          <span className="hidden sm:inline font-medium t-text">Pritesh Kumar</span>
        </Link>

        <button
          onClick={handleLogout}
          className="px-3 py-1.5 rounded-md t-btn-secondary text-xs font-medium"
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Navbar;