"use client";

import { useState, useEffect } from "react";

export default function ActivityForm({ activity, onSubmit, colors }) {
  const [formData, setFormData] = useState({
    name: "",
    percentage: 10,
    targetHours: 1,
    color: colors[0].value,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (activity) {
      setFormData({
        name: activity.name,
        percentage: activity.percentage,
        targetHours: activity.targetHours || 1,
        color: activity.color,
      });
    }
  }, [activity]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Activity name is required";
    }

    if (formData.percentage < 1 || formData.percentage > 100) {
      newErrors.percentage = "Percentage must be between 1 and 100";
    }

    if (formData.targetHours < 0.5 || formData.targetHours > 24) {
      newErrors.targetHours = "Target hours must be between 0.5 and 24";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const submitData = activity
      ? {
          ...activity,
          ...formData,
        }
      : formData;

    onSubmit(submitData);

    if (!activity) {
      setFormData({
        name: "",
        percentage: 10,
        targetHours: 1,
        color: colors[0].value,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Activity Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Activity Name
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Workout, Reading"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Percentage */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Time Allocation: {formData.percentage}%
        </label>
        <input
          type="range"
          min="1"
          max="100"
          value={formData.percentage}
          onChange={(e) =>
            setFormData({
              ...formData,
              percentage: parseInt(e.target.value),
            })
          }
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <input
          type="number"
          min="1"
          max="100"
          value={formData.percentage}
          onChange={(e) =>
            setFormData({
              ...formData,
              percentage: parseInt(e.target.value) || 10,
            })
          }
          className="w-full mt-2 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.percentage && (
          <p className="text-red-500 text-sm mt-1">{errors.percentage}</p>
        )}
      </div>

      {/* Target Hours */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Target Hours: {formData.targetHours}h
        </label>
        <input
          type="number"
          min="0.5"
          max="24"
          step="0.5"
          value={formData.targetHours}
          onChange={(e) =>
            setFormData({
              ...formData,
              targetHours: parseFloat(e.target.value) || 1,
            })
          }
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          The number of hours you want to dedicate to this activity daily
        </p>
        {errors.targetHours && (
          <p className="text-red-500 text-sm mt-1">{errors.targetHours}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Activity Color
        </label>
        <div className="grid grid-cols-4 gap-2">
          {colors.map((colorOption) => (
            <button
              key={colorOption.value}
              type="button"
              onClick={() =>
                setFormData({ ...formData, color: colorOption.value })
              }
              className={`h-10 rounded-lg transition-all border-2 ${
                formData.color === colorOption.value
                  ? "border-gray-900 dark:border-white"
                  : "border-gray-300 dark:border-gray-700"
              } ${colorOption.value}`}
              title={colorOption.name}
            />
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors mt-6"
      >
        {activity ? "Update Activity" : "Add Activity"}
      </button>
    </form>
  );
}
