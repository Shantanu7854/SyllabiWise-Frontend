import { useState } from "react";
import { registerUser } from "../api/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Mail, Lock, User } from "lucide-react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await registerUser(form);
    setLoading(false);

    if (res.message) {
      toast.success("✅ Registered successfully!");
      setForm({ username: "", email: "", password: "" });
    } else {
      toast.error(res.error || "Something went wrong.");
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
              Create an Account
            </CardTitle>
            <p className="text-center text-gray-500 text-sm mt-2">
              Join SyllabiWise and start analyzing your playlists today 🎓
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

              {/* Email */}
              <div>
                <Label>Email</Label>
                <div className="flex items-center gap-2 border rounded-lg px-3">
                  <Mail className="text-gray-400 w-5 h-5" />
                  <Input
                    type="email"
                    className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                {loading ? "Registering..." : "Register"}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-2">
            <p className="text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};
