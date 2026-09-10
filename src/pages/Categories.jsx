import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";
import categories from "../data/categories.json";

export default function Categories() {
  const { student } = useAuth();
  const { activities } = useActivities();

  const mine = activities.filter((a) => a.studentUid === student.uid);

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">Reference</div>
        <h1>Activity Categories</h1>
        <p>
          Activities are grouped into six categories. Each has a suggested
          maximum contribution toward your overall target.
        </p>
      </div>

      <div className="category-grid">
        {categories.map((c) => {
          const earned = mine
            .filter((a) => a.category === c.id)
            .reduce((sum, a) => sum + (a.pointsApproved || 0), 0);

          return (
            <div
              className="category-card"
              key={c.id}
              style={{ "--card-color": c.color }}
            >
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <div className="stat-sub">
                {earned} pts earned &middot; up to {c.maxPoints} pts counted
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
