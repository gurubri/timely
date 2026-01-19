"use client";

import { useState, useEffect } from "react";
import {
  calculateProgress,
  getActivityGoals,
  setActivityGoals,
} from "@/app/lib/timeTracking";

export default function ProgressTracker({ activities }) {
  const [goals, setGoals] = useState({});
  const [progress, setProgress] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    weeklyHours: 0,
    monthlyHours: 0,
  });

  useEffect(() => {
    // Load existing goals
    const existingGoals = getActivityGoals();
    setGoals(existingGoals);

    // Calculate progress for all activities
    const newProgress = {};
    activities.forEach((activity) => {
      newProgress[activity.id] = {
        weekly: calculateProgress(activity.id, "weekly"),
        monthly: calculateProgress(activity.id, "monthly"),
      };
    });
    setProgress(newProgress);
  }, [activities]);

  const handleEditGoal = (activityId) => {
    const activityGoal = goals[activityId] || { weekly: 0, monthly: 0 };
    setFormData({
      weeklyHours: activityGoal.weekly || 0,
      monthlyHours: activityGoal.monthly || 0,
    });
    setEditingId(activityId);
  };

  const handleSaveGoal = (activityId) => {
    setActivityGoals(
      activityId,
      parseFloat(formData.weeklyHours) || 0,
      parseFloat(formData.monthlyHours) || 0,
    );

    const updatedGoals = getActivityGoals();
    setGoals(updatedGoals);

    // Recalculate progress
    const newProgress = {
      ...progress,
      [activityId]: {
        weekly: calculateProgress(activityId, "weekly"),
        monthly: calculateProgress(activityId, "monthly"),
      },
    };
    setProgress(newProgress);

    setEditingId(null);
  };

  const getProgressPercentage = (actual, goal) => {
    if (goal === 0) return 0;
    return Math.min(100, (actual / goal) * 100);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Goal Progress
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Track your progress toward weekly and monthly goals
        </p>
      </div>

      <div className="space-y-6">
        {activities.map((activity) => {
          const activityGoals = goals[activity.id] || {
            weekly: 0,
            monthly: 0,
          };
          const activityProgress = progress[activity.id] || {
            weekly: { actual: 0, goal: 0, percentage: 0 },
            monthly: { actual: 0, goal: 0, percentage: 0 },
          };

          return (
            <div
              key={activity.id}
              className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded ${activity.color}`} />
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    {activity.name}
                  </h4>
                </div>

                {editingId === activity.id ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.weeklyHours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          weeklyHours: e.target.value,
                        })
                      }
                      placeholder="Weekly"
                      className="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Weekly hours"
                    />
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={formData.monthlyHours}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monthlyHours: e.target.value,
                        })
                      }
                      placeholder="Monthly"
                      className="w-20 px-2 py-1 text-sm rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-neutral-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      title="Monthly hours"
                    />
                    <button
                      onClick={() => handleSaveGoal(activity.id)}
                      className="px-3 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded transition-colors"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => handleEditGoal(activity.id)}
                    className="px-3 py-1 text-sm bg-gray-500 hover:bg-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600 text-white rounded transition-colors"
                  >
                    Set Goals
                  </button>
                )}
              </div>

              {/* Weekly Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Weekly Goal
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {activityProgress.weekly.actual.toFixed(1)}h /{" "}
                    {activityGoals.weekly}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getProgressPercentage(activityProgress.weekly.actual, activityGoals.weekly)}%`,
                    }}
                  />
                </div>
              </div>

              {/* Monthly Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Monthly Goal
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {activityProgress.monthly.actual.toFixed(1)}h /{" "}
                    {activityGoals.monthly}h
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                    style={{
                      width: `${getProgressPercentage(activityProgress.monthly.actual, activityGoals.monthly)}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {activities.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500 dark:text-gray-400">
            Add activities to start tracking goals
          </p>
        </div>
      )}
    </div>
  );
}
