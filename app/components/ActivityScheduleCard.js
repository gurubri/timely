"use client";

import { useState, useEffect } from "react";
import {
  calculateActivityProgress,
  formatMinutes,
  autoLogActivityTime,
} from "@/app/lib/activityScheduling";

export default function ActivityScheduleCard({ activity }) {
  const [progress, setProgress] = useState(null);
  const [autoLogInfo, setAutoLogInfo] = useState("");

  useEffect(() => {
    // Initial calculation
    const prog = calculateActivityProgress(activity);
    setProgress(prog);

    // Auto-log time
    const hoursLogged = autoLogActivityTime(activity);
    if (hoursLogged > 0) {
      setAutoLogInfo(`Auto-logged ${hoursLogged.toFixed(1)}h`);
    }

    // Update every minute
    const interval = setInterval(() => {
      const updatedProg = calculateActivityProgress(activity);
      setProgress(updatedProg);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [activity]);

  if (!progress) {
    return null;
  }

  const getStatusColor = () => {
    switch (progress.status) {
      case "In Progress":
        return "from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700";
      case "Upcoming":
        return "from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700";
      case "Completed":
        return "from-green-500 to-green-600 dark:from-green-600 dark:to-green-700";
      default:
        return "from-gray-500 to-gray-600 dark:from-gray-600 dark:to-gray-700";
    }
  };

  const getStatusBadgeColor = () => {
    switch (progress.status) {
      case "In Progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "Upcoming":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "Completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 mb-8">
      {/* Header with status */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Schedule & Progress
        </h3>
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusBadgeColor()}`}>
          <div
            className={`w-2 h-2 rounded-full ${
              progress.isActive ? "bg-current animate-pulse" : "bg-current"
            }`}
          />
          {progress.status}
        </div>
      </div>

      {/* Time Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Scheduled Time
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {progress.startTime} - {progress.endTime}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            Duration: {formatMinutes(progress.totalMinutes)}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Time Elapsed
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatMinutes(Math.max(0, progress.elapsedMinutes))}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {progress.percentComplete}% complete
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-neutral-800 rounded-lg p-4">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Time Remaining
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatMinutes(Math.max(0, progress.remainingMinutes))}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
            {progress.remainingMinutes === 0 ? "Activity complete" : "Until completion"}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Scheduled Progress
          </span>
          <span className="text-sm font-semibold text-gray-900 dark:text-white">
            {progress.percentComplete}%
          </span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${getStatusColor()} transition-all duration-300`}
            style={{ width: `${progress.percentComplete}%` }}
          />
        </div>
      </div>

      {/* Auto-log Info */}
      {autoLogInfo && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            ✓ {autoLogInfo} based on scheduled time
          </p>
        </div>
      )}

      {progress.status === "In Progress" && (
        <div className="mt-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3">
          <p className="text-sm text-amber-800 dark:text-amber-200">
            ⏱️ Currently in progress - {formatMinutes(progress.remainingMinutes)} remaining
          </p>
        </div>
      )}
    </div>
  );
}
