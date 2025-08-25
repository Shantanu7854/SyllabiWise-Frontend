// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

export const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center">
      <motion.h1
        className="text-4xl sm:text-5xl font-bold text-blue-600 mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to 🎵 SyllabiWise
      </motion.h1>

      <motion.p
        className="text-gray-600 text-lg sm:text-xl max-w-2xl mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Analyze YouTube playlists against your syllabus and get tailored
        recommendations powered by AI.
      </motion.p>

      <motion.div
        className="flex flex-col sm:flex-row gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Link to="/login">
          <Button size="lg" className="w-full sm:w-auto">
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Register
          </Button>
        </Link>
      </motion.div>

      <div className="mt-12 grid sm:grid-cols-3 gap-6 max-w-4xl w-full">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">🔑 Secure Login</CardTitle>
          </CardHeader>
          <CardContent>
            Your data is safe with JWT authentication and rate-limited APIs.
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">📊 Smart Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            Match syllabus topics with YouTube videos using Gemini AI.
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-lg">💾 Save & Track</CardTitle>
          </CardHeader>
          <CardContent>
            Your analysis is stored securely in MongoDB for future access.
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
