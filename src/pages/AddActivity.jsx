import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useActivities } from "../context/ActivitiesContext.jsx";
import categories from "../data/categories.json";

const today = new Date().toISOString().slice(0, 10);

const initialForm = {
  title: "",
  category: categories[0].id,
  date: today,
  description: "",
  pointsClaimed: "",
};

export default function AddActivity() {
  const { student } = useAuth();
  const { addActivity } = useActivities();
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(null);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = "Activity title is required.";
    if (!form.date) nextErrors.date = "Select the date of the activity.";
    if (form.date > today) nextErrors.date = "Date cannot be in the future.";
    const points = Number(form.pointsClaimed);
    if (!form.pointsClaimed || Number.isNaN(points) || points <= 0) {
      nextErrors.pointsClaimed = "Enter the points you are claiming (a positive number).";
    }
    if (!form.description.trim()) {
      nextErrors.description = "Add a short description of the activity.";
    }
    return nextErrors;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const newActivity = addActivity({
      studentUid: student.uid,
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      pointsClaimed: Number(form.pointsClaimed),
    });

    setSubmitted(newActivity);
    setForm(initialForm);
  }

  return (
    <div>
      <div className="page-header">
        <div className="page-eyebrow">New submission</div>
        <h1>Add Activity</h1>
        <p>
          Submit a new activity for review. Points are approved by your
          activity coordinator once verified.
        </p>
      </div>

      <div className="panel">
        {submitted && (
          <p className="form-success">
            "{submitted.title}" was submitted and is now pending approval.
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field full">
              <label htmlFor="title">Activity title</label>
              <input
                id="title"
                type="text"
                placeholder="e.g. National Level Coding Competition"
                value={form.title}
                onChange={(e) => updateField("title", e.target.value)}
              />
              {errors.title && <span className="form-error">{errors.title}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={form.category}
                onChange={(e) => updateField("category", e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                max={today}
                value={form.date}
                onChange={(e) => updateField("date", e.target.value)}
              />
              {errors.date && <span className="form-error">{errors.date}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="points">Points claimed</label>
              <input
                id="points"
                type="number"
                min="1"
                placeholder="e.g. 10"
                value={form.pointsClaimed}
                onChange={(e) => updateField("pointsClaimed", e.target.value)}
              />
              {errors.pointsClaimed && (
                <span className="form-error">{errors.pointsClaimed}</span>
              )}
            </div>

            <div className="form-field full">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                placeholder="Briefly describe the activity, your role and the outcome."
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
              />
              {errors.description && (
                <span className="form-error">{errors.description}</span>
              )}
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Submit activity
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate("/activities")}
            >
              View activity list
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
