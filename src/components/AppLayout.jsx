import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/activities", label: "Activity List" },
  { to: "/add-activity", label: "Add Activity" },
  { to: "/categories", label: "Categories" },
  { to: "/profile", label: "Profile" },
];

export default function AppLayout() {
  const { student, logout } = useAuth();

  return (
    <div>
      <header className="navbar">
        <div className="navbar-brand">Activity Points Management System</div>

        <nav className="navbar-links">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                "navbar-link" + (isActive ? " active" : "")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="navbar-right">
          {student && <span>{student.name} ({student.uid})</span>}
          <button className="navbar-logout" onClick={logout} type="button">
            Log out
          </button>
        </div>
      </header>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}
