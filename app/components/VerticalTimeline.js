"use client";

import { mockUserData } from "@/app/lib/mockData";

export default function VerticalTimeline() {
  const generateTimelineHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, "0");
      hours.push(hour);
    }
    return hours;
  };

  const timelineHours = generateTimelineHours();

  // Calculate pixel height per minute for the timeline
  const totalMinutesInDay = 24 * 60;
  const pixelsPerMinute = 60 / 60; // 60px per hour = 1px per minute

  return (
    <div className="w-20 sm:w-24 bg-white dark:bg-neutral-900 border-r border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
      {timelineHours.map((hour) => (
        <div
          key={hour}
          className="h-16 border-b border-gray-200 dark:border-gray-800 flex flex-col justify-start px-1 py-1"
        >
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold text-black dark:text-white leading-none">
              {hour}
            </span>
            <span className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 leading-none">
              00
            </span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 leading-none">
              15
            </span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 leading-none">
              30
            </span>
            <span className="text-[9px] text-gray-400 dark:text-gray-500 leading-none">
              45
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
