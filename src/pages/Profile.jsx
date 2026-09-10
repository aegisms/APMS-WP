import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";

export default function Profile() {
  const { student } = useAuth();
  const { activities } = useActivities();

  const mine = activities.filter((a) => a.studentUid === student.uid);
  const totalApproved = mine.reduce((sum, a) => sum + (a.pointsApproved || 0), 0);
  const totalClaimed = mine.reduce((sum, a) => sum + (a.pointsClaimed || 0), 0);
  const approvedCount = mine.filter((a) => a.status === "Approved").length;
  const pendingCount = mine.filter((a) => a.status === "Pending").length;
  const rejectedCount = mine.filter((a) => a.status === "Rejected").length;

  const initials = student.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Student profile</div>
        <h1>Profile</h1>
        <p>Your registered details and a summary of your activity points.</p>
      </div>

      <div className="panel">
        <div className="profile-header">
          <div className="profile-avatar">{initials}</div>
          <div>
            <h2>{student.name}</h2>
            <p className="form-hint">{student.department}</p>
          </div>
        </div>

        <div className="profile-grid" style={{ marginTop: 20 }}>
          <div>
            <div className="profile-field-label">Student UID</div>
            <div className="profile-field-value">{student.uid}</div>
          </div>
          <div>
            <div className="profile-field-label">Semester</div>
            <div className="profile-field-value">{student.semester}</div>
          </div>
          <div>
            <div className="profile-field-label">Batch</div>
            <div className="profile-field-value">{student.batch}</div>
          </div>
          <div>
            <div className="profile-field-label">Faculty advisor</div>
            <div className="profile-field-value">{student.advisor}</div>
          </div>
          <div>
            <div className="profile-field-label">Email</div>
            <div className="profile-field-value">{student.email}</div>
          </div>
          <div>
            <div className="profile-field-label">Phone</div>
            <div className="profile-field-value">{student.phone}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Points summary</h2>
        </div>
        <div className="stat-grid" style={{ marginBottom: 0 }}>
          <div className="stat-block">
            <div className="stat-label">Approved points</div>
            <div className="stat-value accent">{totalApproved}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Claimed points</div>
            <div className="stat-value">{totalClaimed}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Target points</div>
            <div className="stat-value">{student.targetPoints}</div>
          </div>
          <div className="stat-block">
            <div className="stat-label">Activities</div>
            <div className="stat-value">{mine.length}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Approval breakdown</h2>
        </div>
        <div className="profile-grid">
          <div>
            <div className="profile-field-label">Approved</div>
            <div className="profile-field-value">{approvedCount} activities</div>
          </div>
          <div>
            <div className="profile-field-label">Pending</div>
            <div className="profile-field-value">{pendingCount} activities</div>
          </div>
          <div>
            <div className="profile-field-label">Rejected</div>
            <div className="profile-field-value">{rejectedCount} activities</div>
          </div>
        </div>
      </div>
    </div>
  );
}
