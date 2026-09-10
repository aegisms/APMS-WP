import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";
import CategoryChip from "../components/CategoryChip.jsx";
import StatusPill from "../components/StatusPill.jsx";
import categories from "../data/categories.json";

const STATUS_FILTERS = ["All", "Approved", "Pending", "Rejected"];

export default function ActivityList() {
  const { student } = useAuth();
  const { activities } = useActivities();
  const [statusFilter, setStatusFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const mine = useMemo(
    () => activities.filter((a) => a.studentUid === student.uid),
    [activities, student.uid]
  );

  const filtered = mine
    .filter((a) => statusFilter === "All" || a.status === statusFilter)
    .filter((a) => categoryFilter === "all" || a.category === categoryFilter)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Records</div>
        <h1>Activity List</h1>
        <p>Every activity you've submitted, with its approval status and points.</p>
      </div>

      <div className="panel">
        <div className="filter-bar">
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              type="button"
              className={"filter-chip" + (statusFilter === s ? " active" : "")}
              onClick={() => setStatusFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>

        <div className="filter-bar">
          <button
            type="button"
            className={"filter-chip" + (categoryFilter === "all" ? " active" : "")}
            onClick={() => setCategoryFilter("all")}
          >
            All categories
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              className={"filter-chip" + (categoryFilter === c.id ? " active" : "")}
              onClick={() => setCategoryFilter(c.id)}
            >
              {c.name}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <h3>No matching activities</h3>
            <p>Try a different filter, or add a new activity to your ledger.</p>
          </div>
        ) : (
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Date</th>
                <th>Claimed</th>
                <th>Approved</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link to={`/activities/${a.id}`} className="ledger-row-title">
                      {a.title}
                    </Link>
                    <span className="ledger-row-sub">{a.id}</span>
                  </td>
                  <td>
                    <CategoryChip categoryId={a.category} />
                  </td>
                  <td>
                    {new Date(a.date).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td>{a.pointsClaimed}</td>
                  <td>{a.pointsApproved}</td>
                  <td>
                    <StatusPill status={a.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
