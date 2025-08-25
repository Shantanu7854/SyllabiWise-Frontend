const BASE_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api";

export async function registerUser(data: {username: string, email: string, password: string}) {
  const res = await fetch(`${BASE_URL}/register/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function loginUser(data: {username: string, password: string}) {
  const res = await fetch(`${BASE_URL}/token/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}
