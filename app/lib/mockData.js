// Mock data for the Timely dashboard
export const mockUserData = {
  name: "John Doe",
  workEndTime: "17:00", // 5:00 PM
  bedTime: "23:00", // 11:00 PM
  freeTimeHours: 6, // 6 hours of free time
};

// Activity color palette with dark mode support
export const activityColors = {
  workout: "bg-blue-500 dark:bg-blue-600",
  reading: "bg-purple-500 dark:bg-purple-600",
  prayer: "bg-green-500 dark:bg-green-600",
  meditation: "bg-orange-500 dark:bg-orange-600",
  family: "bg-pink-500 dark:bg-pink-600",
  hobby: "bg-teal-500 dark:bg-teal-600",
  rest: "bg-amber-500 dark:bg-amber-600",
  learning: "bg-indigo-500 dark:bg-indigo-600",
};

// Activities for the day
export const mockActivities = [
  {
    id: 1,
    name: "Workout",
    percentage: 30,
    colorKey: "workout",
    color: activityColors.workout,
    textColor: "text-white",
  },
  {
    id: 2,
    name: "Reading",
    percentage: 40,
    colorKey: "reading",
    color: activityColors.reading,
    textColor: "text-white",
  },
  {
    id: 3,
    name: "Prayer",
    percentage: 10,
    colorKey: "prayer",
    color: activityColors.prayer,
    textColor: "text-white",
  },
  {
    id: 4,
    name: "Rest",
    percentage: 20,
    colorKey: "rest",
    color: activityColors.rest,
    textColor: "text-white",
  },
];

// Calculate the start time for each activity based on percentages
export const calculateActivityTimings = () => {
  const { workEndTime, freeTimeHours } = mockUserData;
  const [hours, minutes] = workEndTime.split(":").map(Number);
  let startDate = new Date();
  startDate.setHours(hours, minutes, 0, 0);

  let activities = mockActivities.map((activity) => {
    const activityDurationMinutes =
      (activity.percentage / 100) * freeTimeHours * 60;
    const startTime = new Date(startDate);
    const endTime = new Date(
      startDate.getTime() + activityDurationMinutes * 60000,
    );

    const activityData = {
      ...activity,
      startTime: startTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      endTime: endTime.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      durationMinutes: Math.round(activityDurationMinutes),
    };

    startDate = endTime;
    return activityData;
  });

  return activities;
};
