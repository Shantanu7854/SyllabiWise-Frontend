import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const Navbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth(); //  get user & logout

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/analyze", label: "Analyze" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-blue-950">
          SyllabiWise
        </Link>

        {/* Nav Links */}
        <div className="flex space-x-6">
          {navItems.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`relative text-sm font-medium transition 
                ${
                  location.pathname === path
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
            >
              {label}
              {location.pathname === path && (
                <span className="absolute left-0 -bottom-1 h-[2px] w-full bg-blue-600 rounded-full" />
              )}
            </Link>
          ))}

          {/* Show login/register if no user, else logout */}
          {!user ? (
            <>
              <Link
                to="/register"
                className={`text-sm font-medium ${
                  location.pathname === "/register"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Register
              </Link>
              <Link
                to="/login"
                className={`text-sm font-medium ${
                  location.pathname === "/login"
                    ? "text-blue-600"
                    : "text-gray-700 hover:text-blue-600"
                }`}
              >
                Login
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="text-sm font-medium text-gray-700 hover:text-blue-600"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
