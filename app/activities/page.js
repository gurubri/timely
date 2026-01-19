"use client";

import { useState, useEffect } from "react";
import AppLayout from "../components/AppLayout";
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";

export default function ActivitiesPage() {
  const [activities, setActivities] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Load activities from localStorage on mount
  useEffect(() => {
    const savedActivities = localStorage.getItem("timely_activities");
    if (savedActivities) {
      try {
        setActivities(JSON.parse(savedActivities));
      } catch (error) {
        console.error("Failed to load activities:", error);
      }
    }
  }, []);

  // Save activities to localStorage
  const saveActivities = (updatedActivities) => {
    localStorage.setItem(
      "timely_activities",
      JSON.stringify(updatedActivities),
    );
    setActivities(updatedActivities);
  };

  const handleAddActivity = (newActivity) => {
    const activity = {
      ...newActivity,
      id: Date.now(),
    };
    saveActivities([...activities, activity]);
    setShowForm(false);
  };

  const handleUpdateActivity = (updatedActivity) => {
    const updated = activities.map((activity) =>
      activity.id === updatedActivity.id ? updatedActivity : activity,
    );
    saveActivities(updated);
    setEditingId(null);
  };

  const handleDeleteActivity = (id) => {
    const updated = activities.filter((activity) => activity.id !== id);
    saveActivities(updated);
    if (editingId === id) {
      setEditingId(null);
    }
  };

  const editingActivity = activities.find((a) => a.id === editingId);

  return (
    <AppLayout>
      <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Manage Activities
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Create and manage the activities you want to track during your
              free time
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 sticky top-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    {editingActivity ? "Edit Activity" : "Add Activity"}
                  </h2>
                  {editingActivity && (
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 font-medium"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <ActivityForm
                  activity={editingActivity}
                  onSubmit={
                    editingActivity ? handleUpdateActivity : handleAddActivity
                  }
                  colors={[
                    { name: "Blue", value: "bg-blue-500 dark:bg-blue-600" },
                    {
                      name: "Purple",
                      value: "bg-purple-500 dark:bg-purple-600",
                    },
                    { name: "Green", value: "bg-green-500 dark:bg-green-600" },
                    {
                      name: "Orange",
                      value: "bg-orange-500 dark:bg-orange-600",
                    },
                    { name: "Pink", value: "bg-pink-500 dark:bg-pink-600" },
                    { name: "Teal", value: "bg-teal-500 dark:bg-teal-600" },
                    { name: "Amber", value: "bg-amber-500 dark:bg-amber-600" },
                    {
                      name: "Indigo",
                      value: "bg-indigo-500 dark:bg-indigo-600",
                    },
                  ]}
                />
              </div>
            </div>

            {/* Activities List Section */}
            <div className="lg:col-span-2">
              <ActivityList
                activities={activities}
                onEdit={setEditingId}
                onDelete={handleDeleteActivity}
              />

              {activities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                    No activities yet. Create your first activity to get
                    started!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
