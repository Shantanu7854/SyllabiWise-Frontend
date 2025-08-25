import { useState } from "react";
import { analyzePlaylist } from "../api/playlist";
import { getToken } from "../utils/jwt";

export const PlaylistAnalyzePage = () => {
  const [form, setForm] = useState({playlist_url: "", syllabus: ""});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = getToken()!;
    const res = await analyzePlaylist(form, token);
    setResult(res);
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Playlist Analyzer</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="YouTube Playlist URL" value={form.playlist_url} onChange={e => setForm({...form, playlist_url: e.target.value})} />
        <textarea className="input" placeholder="Syllabus text" value={form.syllabus} onChange={e => setForm({...form, syllabus: e.target.value})}></textarea>
        <button className="btn btn-blue w-full" type="submit">Analyze</button>
      </form>
      {loading && <p>Loading...</p>}
      {result && <pre className="mt-4 p-2 bg-gray-100 rounded">{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};
