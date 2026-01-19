"use client";

import { mockUserData } from "@/app/lib/mockData";

export default function ActivityBlock({ activity }) {
  // Parse start time to get hour and minute
  const [startHour, startMinute] = activity.startTime.split(":").map(Number);
  const pixelsPerHour = 64; // 4rem per hour
  const pixelsPerMinute = pixelsPerHour / 60;

  // Calculate top position (distance from midnight)
  const topPosition = startHour * pixelsPerHour + startMinute * pixelsPerMinute;

  // Calculate height based on activity duration
  const blockHeight = activity.durationMinutes * pixelsPerMinute;

  return (
    <div
      className="absolute left-0 right-0 mx-4 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
      style={{
        top: `${topPosition}px`,
        height: `${blockHeight}px`,
      }}
    >
      {/* Colored activity block */}
      <div
        className={`w-full h-full ${activity.color} ${activity.textColor} flex items-start justify-center pt-2 relative`}
      >
        {/* Activity name widget - glass morphism style */}
        <div className="bg-black/30 backdrop-blur-md rounded-full px-3 py-1 text-xs sm:text-sm font-semibold whitespace-nowrap shadow-md">
          {activity.name}
        </div>

        {/* Hover overlay with time details */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="text-white text-center text-xs sm:text-sm font-medium">
            <p>
              {activity.startTime} - {activity.endTime}
            </p>
            <p>
              {activity.percentage}% • {activity.durationMinutes}min
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
