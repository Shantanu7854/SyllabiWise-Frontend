import { Link, useLocation } from "react-router-dom";

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/register", label: "Register" },
    { path: "/login", label: "Login" },
    { path: "/analyze", label: "Analyze" },
    // { path: "/dashboard", label: "Dashboard" }, 
  ];

  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md">
      {/* Logo / Brand */}
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:opacity-90 transition"
      >
        Playlist Analyzer
      </Link>

      {/* Navigation Links */}
      <div className="flex space-x-6">
        {navItems.map(({ path, label }) => (
          <Link
            key={path}
            to={path}
            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-200
              ${
                location.pathname === path
                  ? "bg-white text-blue-600 shadow-md"
                  : "hover:bg-white/20"
              }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
