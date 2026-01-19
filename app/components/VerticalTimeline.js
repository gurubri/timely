"use client";

import { mockUserData } from "@/app/lib/mockData";

export default function VerticalTimeline() {
  const generateTimelineHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
      const hour = String(i).padStart(2, "0");
      hours.push(`${hour}:00`);
    }
    return hours;
  };

  const timelineHours = generateTimelineHours();

  // Calculate pixel height per minute for the timeline
  const totalMinutesInDay = 24 * 60;
  const pixelsPerMinute = 60 / 60; // 60px per hour = 1px per minute

  return (
    <div className="w-24 sm:w-28 bg-white dark:bg-neutral-900 border-r border-gray-300 dark:border-gray-700 flex flex-col overflow-hidden">
      {timelineHours.map((time) => (
        <div
          key={time}
          className="h-16 border-b border-gray-200 dark:border-gray-800 flex flex-col px-2 py-0"
        >
          {/* Hour label section */}
          <div className="flex items-center h-7 flex-shrink-0">
            <span className="text-lg sm:text-xl font-bold text-black dark:text-white leading-none">
              {time}
            </span>
          </div>

          {/* Minute markers - 10 minute intervals */}
          <div className="flex flex-col text-xs text-gray-500 dark:text-gray-400 justify-around flex-1 gap-0.5">
            <span className="leading-none">10</span>
            <span className="leading-none">20</span>
            <span className="leading-none">30</span>
            <span className="leading-none">40</span>
            <span className="leading-none">50</span>
          </div>
        </div>
      ))}
    </div>
  );
}
