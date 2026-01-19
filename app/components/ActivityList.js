"use client";

import Link from "next/link";

export default function ActivityList({ activities, onEdit, onDelete }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Your Activities ({activities.length})
      </h2>

      {activities.map((activity) => (
        <div
          key={activity.id}
          className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 hover:shadow-lg transition-shadow"
        >
          <div className="flex items-start gap-4 cursor-pointer">
            <Link href={`/activities/${activity.id}`} className="flex-1">
              <div className="flex items-start gap-4">
                {/* Color Indicator */}
                <div
                  className={`w-6 h-20 rounded-lg flex-shrink-0 ${activity.color}`}
                />

                {/* Activity Details */}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                      {activity.name}
                    </h3>
                    <div className="text-right">
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                        Target: {activity.targetHours}h
                      </p>
                      <span className="text-3xl font-bold text-blue-500 dark:text-blue-400">
                        {activity.percentage}%
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full ${activity.color} transition-all duration-300`}
                        style={{ width: `${activity.percentage}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Color:{" "}
                    <span className="font-medium capitalize">
                      {activity.color.split("-")[1]}
                    </span>
                  </p>
                </div>
              </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(activity.id)}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(activity.id)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
