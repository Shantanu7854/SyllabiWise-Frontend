import { Link } from "react-router-dom";

export const Navbar = () => (
  <nav className="flex justify-between p-4 bg-blue-600 text-white">
    <Link to="/">Home</Link>
    <div className="space-x-4">
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
      <Link to="/analyze">Analyze</Link>
    </div>
  </nav>
);
