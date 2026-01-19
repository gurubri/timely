"use client";

import { mockUserData } from "@/app/lib/mockData";

export default function WelcomeCard() {
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes} (${hours}:00hr)`;
  };

  const freeTimeDisplay = `${mockUserData.freeTimeHours}h`;

  return (
    <div className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-blue-900 dark:to-indigo-800 rounded-lg p-6 mb-8 shadow-lg">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white">
          Welcome, {mockUserData.name}! 👋
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/30 backdrop-blur-md rounded-lg p-4">
            <p className="text-white/90 text-sm font-medium mb-1">
              Time Off Work
            </p>
            <p className="text-white text-2xl font-bold">
              {formatTime(mockUserData.workEndTime)}
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-lg p-4">
            <p className="text-white/90 text-sm font-medium mb-1">Bed Time</p>
            <p className="text-white text-2xl font-bold">
              {formatTime(mockUserData.bedTime)}
            </p>
          </div>

          <div className="bg-white/30 backdrop-blur-md rounded-lg p-4">
            <p className="text-white/90 text-sm font-medium mb-1">Free Time</p>
            <p className="text-white text-2xl font-bold">{freeTimeDisplay}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
