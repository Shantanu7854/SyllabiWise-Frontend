import { useState } from "react";
import { analyzePlaylist } from "../api/playlist";
import { getToken } from "../utils/jwt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
    <div className="flex items-center justify-center min-h-screen px-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Playlist Analyzer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>YouTube Playlist URL</Label>
              <Input
                value={form.playlist_url}
                onChange={(e) => setForm({ ...form, playlist_url: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Syllabus</Label>
              <Textarea
                rows={5}
                value={form.syllabus}
                onChange={(e) => setForm({ ...form, syllabus: e.target.value })}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
          </form>

          {result && (
            <div className="mt-6 p-4 bg-gray-100 rounded-md max-h-96 overflow-y-auto">
              <pre className="text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
