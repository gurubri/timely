"use client";

import { useEffect, useRef } from "react";
import ActivityBlock from "./ActivityBlock";
import { calculateActivityTimings, mockUserData } from "@/app/lib/mockData";

export default function ActivityBlocks() {
  const scrollContainerRef = useRef(null);
  const activities = calculateActivityTimings();

  // Calculate the hour when free time starts (for initial scroll position)
  const [workEndHour, workEndMinute] = mockUserData.workEndTime
    .split(":")
    .map(Number);
  const pixelsPerHour = 64; // 4rem = 64px per hour

  useEffect(() => {
    // Scroll to position the work end time (free time start) at the top
    if (scrollContainerRef.current) {
      const scrollPosition = workEndHour * pixelsPerHour;
      setTimeout(() => {
        scrollContainerRef.current?.scrollTo({
          top: scrollPosition,
          behavior: "smooth",
        });
      }, 100);
    }
  }, [workEndHour]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex-1 bg-white dark:bg-neutral-950 overflow-y-auto max-h-screen"
    >
      {/* Full 24-hour timeline container */}
      <div className="relative min-h-screen">
        {/* Activity blocks overlay */}
        <div className="absolute top-0 left-0 right-0">
          {activities.map((activity, index) => (
            <ActivityBlock
              key={activity.id}
              activity={activity}
              index={index}
            />
          ))}
        </div>

        {/* Hour markers for reference */}
        <div className="relative">
          {Array.from({ length: 24 }).map((_, i) => (
            <div
              key={i}
              className="h-16 border-b border-gray-100 dark:border-gray-900"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
