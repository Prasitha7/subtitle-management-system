import { useState } from "react";
const auth_url = import.meta.env.VITE_AUTH_URL;

function Login({ onClose, onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${auth_url}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      if (!res.ok) throw new Error("Login failed");

      const data = await res.json();
      onLogin(data.token); // send token to parent
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="modal">
      <h3>Login</h3>

      <input
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      {error && <p>{error}</p>}

      <button onClick={handleLogin}>Login</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
}

export default Login;