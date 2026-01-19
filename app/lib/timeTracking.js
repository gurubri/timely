// Time Tracking and Goals Management Utilities

const STORAGE_KEYS = {
  DAILY_LOGS: "timely_daily_logs",
  ACTIVITY_GOALS: "timely_activity_goals",
};

/**
 * Get or create today's daily log
 * Returns: { date: YYYY-MM-DD, activities: { [activityId]: hours } }
 */
export const getTodayLog = () => {
  const today = new Date().toISOString().split("T")[0];
  const logs = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || "{}",
  );

  if (!logs[today]) {
    logs[today] = {
      date: today,
      activities: {},
    };
    localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));
  }

  return logs[today];
};

/**
 * Log time spent on an activity for today
 * @param {number} activityId - Activity ID
 * @param {number} hours - Hours spent
 */
export const logActivityTime = (activityId, hours) => {
  const logs = JSON.parse(
    localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || "{}",
  );
  const today = new Date().toISOString().split("T")[0];

  if (!logs[today]) {
    logs[today] = { date: today, activities: {} };
  }

  logs[today].activities[activityId] = Math.max(0, hours);
  localStorage.setItem(STORAGE_KEYS.DAILY_LOGS, JSON.stringify(logs));

  return logs[today];
};

/**
 * Get all daily logs
 */
export const getAllDailyLogs = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.DAILY_LOGS) || "{}");
};

/**
 * Get logs for a specific date range
 * @param {string} startDate - YYYY-MM-DD format
 * @param {string} endDate - YYYY-MM-DD format
 */
export const getLogsInRange = (startDate, endDate) => {
  const allLogs = getAllDailyLogs();
  const logs = {};

  Object.entries(allLogs).forEach(([date, log]) => {
    if (date >= startDate && date <= endDate) {
      logs[date] = log;
    }
  });

  return logs;
};

/**
 * Get or create activity goals
 * Goals structure: { [activityId]: { weekly: hours, monthly: hours } }
 */
export const getActivityGoals = () => {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ACTIVITY_GOALS) || "{}");
};

/**
 * Set activity goals
 * @param {number} activityId - Activity ID
 * @param {number} weeklyHours - Target weekly hours
 * @param {number} monthlyHours - Target monthly hours
 */
export const setActivityGoals = (activityId, weeklyHours, monthlyHours) => {
  const goals = getActivityGoals();
  goals[activityId] = {
    weekly: Math.max(0, weeklyHours),
    monthly: Math.max(0, monthlyHours),
  };
  localStorage.setItem(STORAGE_KEYS.ACTIVITY_GOALS, JSON.stringify(goals));
  return goals[activityId];
};

/**
 * Calculate progress toward goals
 * @param {number} activityId - Activity ID
 * @param {string} period - 'weekly' or 'monthly'
 */
export const calculateProgress = (activityId, period = "weekly") => {
  const goals = getActivityGoals();
  const goal = goals[activityId]?.[period] || 0;

  if (goal === 0) return { actual: 0, goal: 0, percentage: 0 };

  let startDate, endDate;
  const today = new Date();
  endDate = today.toISOString().split("T")[0];

  if (period === "weekly") {
    // Get Monday of this week
    const day = today.getDay();
    const diff = today.getDate() - day + (day === 0 ? -6 : 1);
    const monday = new Date(today.setDate(diff));
    startDate = monday.toISOString().split("T")[0];
  } else {
    // Get first day of this month
    startDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-01`;
  }

  const logs = getLogsInRange(startDate, endDate);
  let actual = 0;

  Object.values(logs).forEach((log) => {
    actual += log.activities[activityId] || 0;
  });

  const percentage = goal > 0 ? Math.round((actual / goal) * 100) : 0;

  return {
    actual: parseFloat(actual.toFixed(2)),
    goal,
    percentage: Math.min(100, percentage),
    startDate,
    endDate,
  };
};

/**
 * Get summary of time spent on all activities for a date range
 */
export const getSummaryForRange = (startDate, endDate) => {
  const logs = getLogsInRange(startDate, endDate);
  const summary = {};

  Object.values(logs).forEach((log) => {
    Object.entries(log.activities).forEach(([activityId, hours]) => {
      summary[activityId] = (summary[activityId] || 0) + hours;
    });
  });

  return summary;
};

/**
 * Get time spent on activity for today
 */
export const getTodayActivityTime = (activityId) => {
  const today = getTodayLog();
  return today.activities[activityId] || 0;
};
