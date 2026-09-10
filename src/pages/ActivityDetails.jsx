import { Link, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";
import { getCategory } from "../components/CategoryChip.jsx";
import StatusPill from "../components/StatusPill.jsx";

export default function ActivityDetails() {
  const { id } = useParams();
  const { student } = useAuth();
  const { activities } = useActivities();

  const activity = activities.find(
    (a) => a.id === id && a.studentUid === student.uid
  );

  if (!activity) {
    return (
      <div>
        <div className="page-header">
          <h1>Activity not found</h1>
          <p>This activity does not exist or does not belong to your account.</p>
        </div>
        <Link to="/activities" className="btn btn-secondary">
          Back to activity list
        </Link>
      </div>
    );
  }

  const category = getCategory(activity.category);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">
          <Link to="/activities" className="link-button">
            &larr; Activity list
          </Link>
        </div>
        <h1>{activity.title}</h1>
        <p>Reference ID: {activity.id}</p>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Overview</h2>
          <StatusPill status={activity.status} />
        </div>

        <div className="profile-grid">
          <div>
            <div className="profile-field-label">Category</div>
            <div className="profile-field-value">
              {category ? category.name : activity.category}
            </div>
          </div>
          <div>
            <div className="profile-field-label">Date</div>
            <div className="profile-field-value">
              {new Date(activity.date).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </div>
          </div>
          <div>
            <div className="profile-field-label">Points claimed</div>
            <div className="profile-field-value">{activity.pointsClaimed}</div>
          </div>
          <div>
            <div className="profile-field-label">Points approved</div>
            <div className="profile-field-value">{activity.pointsApproved}</div>
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-title-row">
          <h2>Description</h2>
        </div>
        <p>{activity.description || "No description was provided for this activity."}</p>
      </div>
    </div>
  );
}
