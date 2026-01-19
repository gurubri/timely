"use client";

import { useState, useEffect } from "react";
import { use } from "react";
import Link from "next/link";
import AppLayout from "@/app/components/AppLayout";
import TimeTracker from "@/app/components/TimeTracker";
import ProgressTracker from "@/app/components/ProgressTracker";
import { getTodayActivityTime, getActivityGoals } from "@/app/lib/timeTracking";

export default function ActivityDetailPage({ params }) {
  const { id } = use(params);
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [todayHours, setTodayHours] = useState(0);
  const [goals, setGoals] = useState({ weekly: 0, monthly: 0 });

  useEffect(() => {
    // Load activities from localStorage
    const stored = localStorage.getItem("timely_activities");
    if (stored) {
      try {
        const activities = JSON.parse(stored);
        const found = activities.find((a) => a.id === id);
        setActivity(found);

        // Load today's hours and goals
        if (found) {
          const hours = getTodayActivityTime(found.id);
          setTodayHours(hours);

          const allGoals = getActivityGoals();
          const activityGoals = allGoals[found.id] || { weekly: 0, monthly: 0 };
          setGoals(activityGoals);
        }
      } catch (e) {
        console.error("Failed to parse activities", e);
      }
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">Loading...</p>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!activity) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Activity not found
              </p>
              <Link
                href="/activities"
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
              >
                ← Back to Activities
              </Link>
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mb-6 transition-colors"
          >
            ← Back to Activities
          </Link>

          {/* Main Header Card */}
          <div
            className={`${activity.color} rounded-2xl p-8 mb-8 shadow-lg relative overflow-hidden`}
          >
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-black/20 rounded-2xl" />

            <div className="relative z-10">
              <h1 className="text-5xl font-bold text-white mb-8">
                {activity.name}
              </h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Hours Set (Goal) */}
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Hours Set
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {goals.weekly}
                    </span>
                    <span className="text-xl text-white/80">h/week</span>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    {goals.monthly}h/month target
                  </p>
                </div>

                {/* Hours Reached (Today) */}
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Hours Reached Today
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {todayHours}
                    </span>
                    <span className="text-xl text-white/80">h</span>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    {activity.targetHours}h daily target
                  </p>
                </div>

                {/* Daily Allocation */}
                <div className="bg-white/20 backdrop-blur-md rounded-xl p-6 border border-white/30">
                  <p className="text-white/80 text-sm font-medium mb-2">
                    Daily Allocation
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-white">
                      {activity.percentage}
                    </span>
                    <span className="text-xl text-white/80">%</span>
                  </div>
                  <p className="text-white/60 text-xs mt-3">
                    of your free time
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Time Tracker */}
          <div className="mb-8">
            <TimeTracker activities={[activity]} />
          </div>

          {/* Progress Tracker */}
          <div className="mb-8">
            <ProgressTracker activities={[activity]} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
