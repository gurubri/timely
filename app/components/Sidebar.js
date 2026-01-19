"use client";

import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);

  const navigationItems = [
    {
      id: 1,
      label: "Dashboard",
      icon: "📊",
      href: "/",
    },
    {
      id: 2,
      label: "Activities",
      icon: "🎯",
      href: "/activities",
    },
    {
      id: 3,
      label: "Schedule",
      icon: "📅",
      href: "/schedule",
    },
    {
      id: 4,
      label: "Analytics",
      icon: "📈",
      href: "/analytics",
    },
    {
      id: 5,
      label: "Settings",
      icon: "⚙️",
      href: "/settings",
    },
  ];

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-white dark:bg-neutral-950 border-r border-gray-300 dark:border-gray-700 fixed h-screen left-0 top-0 transition-all duration-300 ease-in-out flex flex-col z-50`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-300 dark:border-gray-700">
          {isOpen && (
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
              Timely
            </h1>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-neutral-900 rounded-lg transition-colors"
            aria-label="Toggle sidebar"
          >
            {isOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3">
          <ul className="space-y-2">
            {navigationItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-neutral-900 transition-colors group"
                >
                  <span className="text-2xl flex-shrink-0">{item.icon}</span>
                  {isOpen && (
                    <span className="font-medium text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="p-4 border-t border-gray-300 dark:border-gray-700 space-y-3">
          {/* Theme Toggle */}
          <div className="flex justify-center">
            <ThemeToggle />
          </div>

          <button className="w-full flex items-center gap-4 px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-900 transition-colors">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold flex-shrink-0">
              JD
            </div>
            {isOpen && (
              <div className="text-left">
                <p className="font-semibold text-gray-900 dark:text-white text-sm">
                  John Doe
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Profile
                </p>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 md:hidden p-3 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors z-40"
        aria-label="Toggle sidebar"
      >
        ☰
      </button>
    </>
  );
}
