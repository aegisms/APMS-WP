import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { AuthProvider, useAuth } from "./context/AuthContext.jsx";
import { ActivitiesProvider } from "./context/ActivitiesContext.jsx";
import AppLayout from "./components/AppLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ActivityList from "./pages/ActivityList.jsx";
import ActivityDetails from "./pages/ActivityDetails.jsx";
import AddActivity from "./pages/AddActivity.jsx";
import Categories from "./pages/Categories.jsx";
import Profile from "./pages/Profile.jsx";

function ProtectedRoute({ children }) {
  const { student, authChecked } = useAuth();
  if (!authChecked) return null;
  if (!student) return <Navigate to="/login" replace />;
  return children;
}

function PublicOnlyRoute({ children }) {
  const { student, authChecked } = useAuth();
  if (!authChecked) return null;
  if (student) return <Navigate to="/dashboard" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <ActivitiesProvider>
        <HashRouter>
          <Routes>
            <Route
              path="/login"
              element={
                <PublicOnlyRoute>
                  <Login />
                </PublicOnlyRoute>
              }
            />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <AppLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="activities" element={<ActivityList />} />
              <Route path="activities/:id" element={<ActivityDetails />} />
              <Route path="add-activity" element={<AddActivity />} />
              <Route path="categories" element={<Categories />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </HashRouter>
      </ActivitiesProvider>
    </AuthProvider>
  );
}
