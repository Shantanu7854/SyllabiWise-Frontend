import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { RegisterPage } from "./pages/RegisterPage";
import { Home } from "./pages/Home";
import { LoginPage } from "./pages/LoginPage";
import { PlaylistAnalyzePage } from "./pages/PlaylistAnalyzePage";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/analyze" element={<ProtectedRoute><PlaylistAnalyzePage /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;
