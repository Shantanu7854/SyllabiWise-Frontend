const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function analyzePlaylist(data: {playlist_url: string, syllabus: string}, token: string) {
  const res = await fetch(`${BASE_URL}/playlist-analyze/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}
