import React, { useState } from 'react';
import axios from 'axios';

const Analyzer = () => {
  const [playlistUrl, setPlaylistUrl] = useState('');
  const [syllabus, setSyllabus] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('https://syllabiwise-backend.onrender.com/api/playlist-analyze/', {
        playlist_url: playlistUrl,
        syllabus: syllabus,
      });
      setResults(res.data.recommendations);
    } catch (err) {
      console.error(err);
      alert('Error analyzing playlist');
    }
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h1 className="text-2xl font-bold mb-6 text-center">🎓 SyllabiWise Video Recommender</h1>

      <label className="block font-semibold mb-2">YouTube Playlist URL</label>
      <input
        type="text"
        value={playlistUrl}
        onChange={(e) => setPlaylistUrl(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="https://www.youtube.com/playlist?list=..."
      />

      <label className="block font-semibold mb-2">Paste Your Syllabus</label>
      <textarea
        rows={6}
        value={syllabus}
        onChange={(e) => setSyllabus(e.target.value)}
        className="w-full border p-2 rounded mb-4"
        placeholder="e.g. Unit 1: Light Propagation\nUnit 2: Optical Fiber..."
      />

      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        disabled={loading}
      >
        {loading ? 'Analyzing...' : 'Get Recommendations'}
      </button>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">📚 Recommendations</h2>
          {results.map((item, index) => (
            <div key={index} className="mb-6 border p-4 rounded shadow">
              <h3 className="font-semibold text-lg mb-2">{item.topic}</h3>
              <ul className="list-disc pl-5">
                {item.videos.map((video: string, idx: number) => (
                  <li key={idx}>{video}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Analyzer;
