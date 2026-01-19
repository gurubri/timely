"use client";

import { useState, useEffect } from "react";
import {
  getTodayLog,
  logActivityTime,
  getTodayActivityTime,
} from "@/app/lib/timeTracking";

export default function TimeTracker({ activities }) {
  const [timeLogged, setTimeLogged] = useState({});
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    // Load today's logged times
    const newTimeLogged = {};
    activities.forEach((activity) => {
      newTimeLogged[activity.id] = getTodayActivityTime(activity.id);
    });
    setTimeLogged(newTimeLogged);
  }, [activities]);

  const handleTimeChange = (activityId, hours) => {
    const newTime = Math.max(0, parseFloat(hours) || 0);
    setTimeLogged({ ...timeLogged, [activityId]: newTime });
  };

  const handleSaveTime = (activityId) => {
    logActivityTime(activityId, timeLogged[activityId]);
    setEditingId(null);
  };

  const totalLogged = Object.values(timeLogged).reduce(
    (sum, val) => sum + val,
    0,
  );

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Today's Time Tracking
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Log the actual time spent on each activity
        </p>
      </div>

      <div className="space-y-4 mb-6">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between p-4 bg-gray-50 dark:bg-neutral-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-4 h-4 rounded ${activity.color}`} />
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">
                  {activity.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Target: {activity.targetHours}h
                </p>
              </div>
            </div>

            {editingId === activity.id ? (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  step="0.5"
                  value={timeLogged[activity.id]}
                  onChange={(e) =>
                    handleTimeChange(activity.id, e.target.value)
                  }
                  autoFocus
                  className="w-16 px-2 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  h
                </span>
                <button
                  onClick={() => handleSaveTime(activity.id)}
                  className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-500 dark:text-blue-400">
                    {timeLogged[activity.id]}h
                  </p>
                </div>
                <button
                  onClick={() => setEditingId(activity.id)}
                  className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded transition-colors"
                >
                  Log
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Total Logged Today:
          </span>
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {totalLogged}h
          </span>
        </div>
      </div>
    </div>
  );
}
