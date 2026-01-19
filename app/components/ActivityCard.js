"use client";

export default function ActivityCard({ activity }) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-gray-200 dark:border-gray-800 p-4 sm:p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center gap-4">
        {/* Color indicator */}
        <div className={`w-4 h-16 rounded-full ${activity.color}`} />

        {/* Activity details */}
        <div className="flex-1">
          <h3 className="text-lg sm:text-xl font-bold text-black dark:text-white mb-2">
            {activity.name}
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Allocation
              </p>
              <p className="text-lg sm:text-xl font-bold text-black dark:text-white">
                {activity.percentage}%
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Duration
              </p>
              <p className="text-lg sm:text-xl font-bold text-black dark:text-white">
                {Math.floor(activity.durationMinutes / 60)}h{" "}
                {activity.durationMinutes % 60}m
              </p>
            </div>

            <div>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium mb-1">
                Time
              </p>
              <p className="text-lg sm:text-xl font-bold text-black dark:text-white">
                {activity.startTime}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
              <div
                className={`h-full ${activity.color} transition-all duration-300`}
                style={{ width: `${activity.percentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
