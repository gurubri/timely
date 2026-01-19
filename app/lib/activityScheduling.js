import { calculateActivityTimings } from "./mockData";
import { logActivityTime, getTodayActivityTime } from "./timeTracking";

/**
 * Calculate the scheduled time details for an activity
 * @param {Object} activity - The activity object
 * @returns {Object} - Contains startTime, endTime, scheduledMinutes, and other timing info
 */
export const getActivityScheduleInfo = (activity) => {
  const activities = calculateActivityTimings();
  const scheduledActivity = activities.find((a) => a.id === activity.id);

  if (!scheduledActivity) {
    return {
      startTime: null,
      endTime: null,
      scheduledMinutes: 0,
      durationMinutes: 0,
    };
  }

  return {
    startTime: scheduledActivity.startTime,
    endTime: scheduledActivity.endTime,
    scheduledMinutes: scheduledActivity.durationMinutes,
    durationMinutes: scheduledActivity.durationMinutes,
  };
};

/**
 * Calculate elapsed time and remaining time for an activity
 * @param {Object} activity - The activity object
 * @returns {Object} - Contains elapsedMinutes, remainingMinutes, percentComplete, isActive, status
 */
export const calculateActivityProgress = (activity) => {
  const schedule = getActivityScheduleInfo(activity);

  if (!schedule.startTime || !schedule.endTime) {
    return {
      elapsedMinutes: 0,
      remainingMinutes: 0,
      percentComplete: 0,
      isActive: false,
      status: "Not scheduled",
    };
  }

  // Parse times
  const [startHours, startMins] = schedule.startTime.split(":").map(Number);
  const [endHours, endMins] = schedule.endTime.split(":").map(Number);

  const startDate = new Date();
  startDate.setHours(startHours, startMins, 0, 0);

  const endDate = new Date();
  endDate.setHours(endHours, endMins, 0, 0);

  // Handle case where activity extends past midnight
  if (endDate < startDate) {
    endDate.setDate(endDate.getDate() + 1);
  }

  const now = new Date();

  // Check if activity is currently active
  let isActive = now >= startDate && now < endDate;
  let elapsedMinutes = 0;
  let remainingMinutes = schedule.scheduledMinutes;
  let percentComplete = 0;
  let status = "Not yet started";

  if (now < startDate) {
    // Activity hasn't started yet
    remainingMinutes = Math.round(
      (startDate - now) / 1000 / 60 + schedule.scheduledMinutes
    );
    status = "Upcoming";
  } else if (now >= endDate) {
    // Activity has finished
    isActive = false;
    elapsedMinutes = schedule.scheduledMinutes;
    remainingMinutes = 0;
    percentComplete = 100;
    status = "Completed";
  } else {
    // Activity is ongoing
    isActive = true;
    elapsedMinutes = Math.round((now - startDate) / 1000 / 60);
    remainingMinutes = Math.max(0, schedule.scheduledMinutes - elapsedMinutes);
    percentComplete = Math.round((elapsedMinutes / schedule.scheduledMinutes) * 100);
    status = "In Progress";
  }

  return {
    elapsedMinutes,
    remainingMinutes,
    percentComplete,
    isActive,
    status,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    totalMinutes: schedule.scheduledMinutes,
  };
};

/**
 * Auto-log time based on scheduled activity progress
 * Logs the elapsed scheduled time as actual time spent
 * @param {Object} activity - The activity object
 * @returns {number} - Hours auto-logged
 */
export const autoLogActivityTime = (activity) => {
  const progress = calculateActivityProgress(activity);
  const currentLogged = getTodayActivityTime(activity.id);

  // Calculate hours that should be logged based on progress
  const shouldBeLogged = Math.floor(progress.elapsedMinutes / 60 * 10) / 10; // Round down to nearest 0.1h

  // Only log if there's new time to log
  if (shouldBeLogged > currentLogged) {
    const hoursToLog = shouldBeLogged - currentLogged;
    logActivityTime(activity.id, shouldBeLogged);
    return hoursToLog;
  }

  return 0;
};

/**
 * Format minutes into human-readable time
 * @param {number} minutes - Total minutes
 * @returns {string} - Formatted string like "1h 30m"
 */
export const formatMinutes = (minutes) => {
  if (minutes < 0) minutes = 0;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  }
  if (mins === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${mins}m`;
};
