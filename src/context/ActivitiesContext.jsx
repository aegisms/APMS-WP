import { createContext, useContext, useEffect, useState } from "react";
import seedActivities from "../data/activities.json";

const ActivitiesContext = createContext(null);
const STORAGE_KEY = "apms_activities";

function loadActivities() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      return seedActivities;
    }
  }
  return seedActivities;
}

export function ActivitiesProvider({ children }) {
  const [activities, setActivities] = useState(loadActivities);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
  }, [activities]);

  function addActivity(activity) {
    const newActivity = {
      id: `A${Date.now()}`,
      status: "Pending",
      pointsApproved: 0,
      ...activity,
    };
    setActivities((prev) => [newActivity, ...prev]);
    return newActivity;
  }

  function resetToSampleData() {
    localStorage.removeItem(STORAGE_KEY);
    setActivities(seedActivities);
  }

  return (
    <ActivitiesContext.Provider value={{ activities, addActivity, resetToSampleData }}>
      {children}
    </ActivitiesContext.Provider>
  );
}

export function useActivities() {
  const ctx = useContext(ActivitiesContext);
  if (!ctx) throw new Error("useActivities must be used within an ActivitiesProvider");
  return ctx;
}
