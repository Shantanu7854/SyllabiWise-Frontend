// src/pages/Home.tsx
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BookOpen, Github, Youtube, Shield } from "lucide-react";

export const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center flex-1 text-center px-6 py-20">
        <motion.img
          src="/logo.png"
          alt="SyllabiWise Logo"
          className="w-64 h-64"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        />
        <motion.p
          className="text-lg sm:text-xl text-gray-600 max-w-2xl mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Bridge the gap between your <span className="font-semibold">syllabus </span>
          and <span className="font-semibold">YouTube playlists</span>.
          Get curated video recommendations according to your syllabus, powered by AI.
        </motion.p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/analyze">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-transform transform hover:scale-105"
            >
              Get Started
            </Button>
          </Link>
          {/* <Link to="/register">
            <Button size="lg" variant="outline">
              Register
            </Button>
          </Link> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 grid sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <Youtube className="w-10 h-10 mx-auto text-red-500" />
            <h3 className="text-xl font-semibold">Playlist Analyzer</h3>
            <p className="text-gray-600 text-sm">
              Match YouTube videos with your syllabus topics instantly.
            </p>
          </div>
          <div className="space-y-3">
            <BookOpen className="w-10 h-10 mx-auto text-green-600" />
            <h3 className="text-xl font-semibold">AI-Powered Learning</h3>
            <p className="text-gray-600 text-sm">
              Leverage Gemini AI to find the most relevant resources for study.
            </p>
          </div>
          <div className="space-y-3">
            <Shield className="w-10 h-10 mx-auto text-blue-600" />
            <h3 className="text-xl font-semibold">Secure & Reliable</h3>
            <p className="text-gray-600 text-sm">
              JWT authentication + MongoDB ensures data security & reliability.
            </p>
          </div>
        </div>
      </section>

      {/* GitHub Repositories */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            📂 Explore the Code
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" /> Frontend
                </CardTitle>
              </CardHeader>
              <CardContent>
                Built with React + Vite + TypeScript + Shadcn UI.
              </CardContent>
              <CardFooter>
                <a
                  href="https://github.com/Shantanu7854/SyllabiWise-Frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="sm">
                    View Repo
                  </Button>
                </a>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Github className="w-5 h-5" /> Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                Django REST API with MongoDB & Gemini AI integration.
              </CardContent>
              <CardFooter>
                <a
                  href="https://github.com/Shantanu7854/SyllabiWise-Backend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" size="sm">
                    View Repo
                  </Button>
                </a>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          Ready to analyze your first playlist?
        </h2>
        <p className="mb-6 text-gray-100">
          Register, log in, and try the Playlist Analyzer today.
        </p>
        <Link to="/analyze">
          <Button size="lg" variant="secondary">
            Start Analyzing
          </Button>
        </Link>
      </section>
    </div>
  );
};
