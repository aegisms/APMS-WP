import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import studentsData from "../data/students.json";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (!uid.trim() || !password) {
      setError("Enter both your UID and password.");
      return;
    }
    const result = login(uid, password);
    if (result.success) {
      navigate("/dashboard", { replace: true });
    } else {
      setError(result.message);
    }
  }

  function fillSample(sample) {
    setUid(sample.uid);
    setPassword(sample.password);
    setError("");
  }

  return (
    <div className="login-page">
      <div className="login-panel">
        <h1>Activity Points Management System</h1>
        <p className="login-tagline">
          Track, submit and review your co-curricular and extra-curricular
          activity points in one place.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-field">
            <label htmlFor="uid">Student UID</label>
            <input
              id="uid"
              type="text"
              placeholder="e.g. CS21B045"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div className="form-field" style={{ marginTop: 14 }}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>

          {error && <p className="form-error" style={{ marginTop: 14 }}>{error}</p>}

          <button className="btn btn-primary login-submit" type="submit">
            Log in
          </button>
        </form>

        <div className="login-samples">
          <p className="form-hint">Try a sample account:</p>
          <div className="login-sample-list">
            {studentsData.map((s) => (
              <button
                key={s.uid}
                type="button"
                className="login-sample-chip"
                onClick={() => fillSample(s)}
              >
                {s.uid} &mdash; {s.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
