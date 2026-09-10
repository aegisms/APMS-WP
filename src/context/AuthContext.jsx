import { createContext, useContext, useEffect, useState } from "react";
import studentsData from "../data/students.json";

const AuthContext = createContext(null);
const SESSION_KEY = "apms_session_uid";

export function AuthProvider({ children }) {
  const [student, setStudent] = useState(null);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const savedUid = localStorage.getItem(SESSION_KEY);
    if (savedUid) {
      const found = studentsData.find((s) => s.uid === savedUid);
      if (found) setStudent(found);
    }
    setAuthChecked(true);
  }, []);

  function login(uid, password) {
    const trimmedUid = uid.trim().toUpperCase();
    const match = studentsData.find(
      (s) => s.uid.toUpperCase() === trimmedUid && s.password === password
    );
    if (match) {
      setStudent(match);
      localStorage.setItem(SESSION_KEY, match.uid);
      return { success: true };
    }
    return { success: false, message: "Invalid UID or password. Please check the sample credentials and try again." };
  }

  function logout() {
    setStudent(null);
    localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ student, login, logout, authChecked }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
