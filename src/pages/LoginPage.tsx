import { useState } from "react";
import { loginUser } from "../api/auth";
import { setToken } from "../utils/jwt";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [form, setForm] = useState({username: "", password: ""});
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await loginUser(form);
    if(res.access){
      setToken(res.access);
      navigate("/analyze");
    } else {
      setMessage(res.detail || res.error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="input" placeholder="Username" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
        <button className="btn btn-blue w-full" type="submit">Login</button>
      </form>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
};
