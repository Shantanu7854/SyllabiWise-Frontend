import { useState } from "react";
import { loginUser } from "../api/auth";
import { setToken } from "../utils/jwt";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { User, Lock } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await loginUser(form);
    setLoading(false);

    if (res.access) {
      setToken(res.access); // still store JWT
      login(form.username); // update global auth state
      toast.success("🎉 Logged in successfully!");
      navigate("/analyze");
    } else {
      toast.error(res.detail || res.error || "Invalid credentials.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-lg border rounded-2xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center text-blue-600">
              Hey👋
            </CardTitle>
            <p className="text-center text-gray-500 text-sm mt-2">
              Login to continue using <span className="font-semibold">SyllabiWise</span>
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Username */}
              <div>
                <Label>Username</Label>
                <div className="flex items-center gap-2 border rounded-lg px-3">
                  <User className="text-gray-400 w-5 h-5" />
                  <Input
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <Label>Password</Label>
                <div className="flex items-center gap-2 border rounded-lg px-3">
                  <Lock className="text-gray-400 w-5 h-5" />
                  <Input
                    type="password"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                  />
                </div>
              </div>

              {/* Submit */}
              <Button className="w-full mt-4" type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Register
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
