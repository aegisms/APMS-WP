import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";
import CategoryChip from "../components/CategoryChip.jsx";
import StatusPill from "../components/StatusPill.jsx";

export default function Dashboard() {
  const { student } = useAuth();
  const { activities } = useActivities();

  const mine = activities.filter((a) => a.studentUid === student.uid);
  const totalApproved = mine.reduce((sum, a) => sum + (a.pointsApproved || 0), 0);
  const totalClaimed = mine.reduce((sum, a) => sum + (a.pointsClaimed || 0), 0);
  const pendingCount = mine.filter((a) => a.status === "Pending").length;
  const remaining = Math.max(student.targetPoints - totalApproved, 0);
  const progressPct = Math.min(
    100,
    Math.round((totalApproved / student.targetPoints) * 100)
  );

  const recent = [...mine]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Welcome back</div>
        <h1>{student.name}</h1>
        <p>
          {student.department} &middot; Semester {student.semester} &middot; UID{" "}
          {student.uid}
        </p>
      </div>

      <div className="stat-grid">
        <div className="stat-block">
          <div className="stat-label">Points earned</div>
          <div className="stat-value accent">{totalApproved}</div>
          <div className="stat-sub">of {student.targetPoints} required</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Points remaining</div>
          <div className="stat-value">{remaining}</div>
          <div className="stat-sub">to reach your target</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Points claimed</div>
          <div className="stat-value">{totalClaimed}</div>
          <div className="stat-sub">across {mine.length} activities</div>
        </div>
        <div className="stat-block">
          <div className="stat-label">Awaiting review</div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-sub">pending approval</div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Progress toward target</h2>
          <span className="form-hint">{progressPct}% complete</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progressPct}%` }} />
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Recent activities</h2>
          <Link to="/activities" className="link-button">
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <div className="empty-state">
            <h3>No activities logged yet</h3>
            <p>Add your first activity to start earning points.</p>
          </div>
        ) : (
          <table className="ledger-table">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Category</th>
                <th>Date</th>
                <th>Points</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((a) => (
                <tr key={a.id}>
                  <td>
                    <Link to={`/activities/${a.id}`} className="ledger-row-title">
                      {a.title}
                    </Link>
                  </td>
                  <td>
                    <CategoryChip categoryId={a.category} />
                  </td>
                  <td>{new Date(a.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td>
                    {a.pointsApproved} / {a.pointsClaimed}
                  </td>
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
