import { useState } from "react";
import { analyzePlaylist } from "../api/playlist";
import { getToken } from "../utils/jwt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Link as LinkIcon, BookOpen } from "lucide-react";

export const PlaylistAnalyzePage = () => {
  const [form, setForm] = useState({ playlist_url: "", syllabus: "" });
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
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
    <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
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
                    onChange={(e) => setForm({ ...form, playlist_url: e.target.value })}
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
                    onChange={(e) => setForm({ ...form, syllabus: e.target.value })}
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

            {/* Results */}
            {result && (
              <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow-inner max-h-96 overflow-y-auto">
                <h3 className="text-lg font-semibold mb-2 text-blue-600">Recommendations</h3>
                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                  {JSON.stringify(result, null, 2)}
                </pre>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};
