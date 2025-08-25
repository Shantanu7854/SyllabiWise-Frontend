import { useState } from "react";
import { registerUser } from "../api/auth";

export const RegisterPage = () => {
  const [form, setForm] = useState({username: "", email: "", password: ""});
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await registerUser(form);
    setMessage(res.message || res.error);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        <input className="input" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className="btn btn-blue w-full" type="submit">Register</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};
