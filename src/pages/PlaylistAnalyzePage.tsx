import { useState } from "react";
import { analyzePlaylist } from "../api/playlist";
import { getToken } from "../utils/jwt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Link as LinkIcon, BookOpen, PlayCircle, Loader2 } from "lucide-react";

export const PlaylistAnalyzePage = () => {
  const [form, setForm] = useState({ playlist_url: "", syllabus: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null); // clear previous results
    const token = getToken()!;
    const res = await analyzePlaylist(form, token);
    setLoading(false);

    if (res.recommendations) {
      setResult(res.recommendations);
    } else {
      toast.error(res.error || "Analysis failed.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl"
      >
        {/* Conditional Layout */}
        <div
          className={`grid gap-6 ${
            result || loading ? "md:grid-cols-2" : "md:grid-cols-1"
          }`}
        >
          {/* Left: Form */}
          <Card className="shadow-lg border rounded-2xl">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center text-blue-600">
                Playlist Analyzer
              </CardTitle>
              <p className="text-center text-gray-500 text-sm mt-2">
                Paste your <span className="font-semibold">YouTube playlist</span> and syllabus to get recommendations 📚
              </p>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Playlist URL */}
                <div>
                  <Label>YouTube Playlist URL</Label>
                  <div className="flex items-center gap-2 border rounded-lg px-3">
                    <LinkIcon className="text-gray-400 w-5 h-5" />
                    <Input
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={form.playlist_url}
                      onChange={(e) =>
                        setForm({ ...form, playlist_url: e.target.value })
                      }
                      placeholder="https://www.youtube.com/playlist?list=..."
                      required
                    />
                  </div>
                </div>

                {/* Syllabus */}
                <div>
                  <Label>Syllabus</Label>
                  <div className="flex items-start gap-2 border rounded-lg px-3 py-2">
                    <BookOpen className="text-gray-400 w-5 h-5 mt-1" />
                    <Textarea
                      rows={5}
                      className="border-none focus-visible:ring-0 focus-visible:ring-offset-0"
                      value={form.syllabus}
                      onChange={(e) =>
                        setForm({ ...form, syllabus: e.target.value })
                      }
                      placeholder="Paste your syllabus here..."
                      required
                    />
                  </div>
                </div>

                {/* Submit */}
                <Button className="w-full mt-4" type="submit" disabled={loading}>
                  {loading ? "Analyzing..." : "Analyze"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Right: Results */}
          <AnimatePresence>
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-lg border rounded-2xl flex items-center justify-center min-h-[400px]">
                  <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                </Card>
              </motion.div>
            )}

            {result && !loading && (
              <motion.div
                key="results"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="shadow-lg border rounded-2xl overflow-hidden">
                  <CardHeader className="bg-blue-600 text-white">
                    <CardTitle className="text-xl font-semibold">
                      Recommendations
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="max-h-[600px] overflow-y-auto p-4 space-y-6">
                    {result.map((section: any, index: number) => (
                      <div
                        key={index}
                        className="bg-white p-4 rounded-lg shadow-sm border hover:shadow-md transition"
                      >
                        {/* Topic */}
                        <h4 className="text-md font-bold text-blue-600 mb-3">
                          <b>For the Topic: </b>
                          {section.topic}
                        </h4>

                        {/* Videos */}
                        <ul className="space-y-2 text-sm text-gray-700">
                          {section.videos.map((video: string, i: number) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 p-2 rounded-lg hover:bg-gray-50 transition"
                            >
                              <PlayCircle className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                              <span>{video}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
