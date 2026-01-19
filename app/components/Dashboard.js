"use client";

import WelcomeCard from "./WelcomeCard";
import VerticalTimeline from "./VerticalTimeline";
import ActivityBlocks from "./ActivityBlocks";
import ActivityCard from "./ActivityCard";
import { calculateActivityTimings } from "@/app/lib/mockData";

export default function Dashboard() {
  const activities = calculateActivityTimings();

  return (
    <div className="min-h-screen bg-white dark:bg-black p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Card */}
        <WelcomeCard />

        {/* Timeline and Activity Blocks Section */}
        <div className="flex gap-4 mb-8 rounded-lg overflow-hidden border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-950">
          {/* Vertical Timeline */}
          <VerticalTimeline />

          {/* Activity Blocks */}
          <ActivityBlocks />
        </div>

        {/* Activity Cards Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Today's Activities
          </h2>
          {activities.map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
        </div>
      </div>
    </div>
  );
}
