import React, { useState } from "react";
import { TrendingUp, Target, Award, Calendar, ArrowLeft } from "lucide-react";

// ✅ Reusable subpage wrapper
const SubPageWrapper = ({ title, icon, onBack, children }) => (
  <div className="space-y-6">
    <div className="flex items-center space-x-3 border-b pb-4 dark:border-gray-700">
      <button
        onClick={onBack}
        className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
      {icon}
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
    </div>
    <div className="grid gap-6">{children}</div>
  </div>
);

// ✅ Main Progress Overview
const ProgressMain = ({ setActivePage }) => (
  <div className="space-y-8">
    <div className="text-center py-12">
      <TrendingUp className="w-16 h-16 text-orange-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        Progress Tracking
      </h2>
      <p className="text-gray-600 dark:text-gray-400">
        Monitor your fitness journey and celebrate milestones
      </p>
    </div>

    {/* ✅ Progress Cards */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <button
        onClick={() => setActivePage("goals")}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <Target className="w-10 h-10 text-blue-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Goals
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Track your fitness goals
        </p>
      </button>

      <button
        onClick={() => setActivePage("achievements")}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <Award className="w-10 h-10 text-green-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Achievements
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Celebrate milestones
        </p>
      </button>

      <button
        onClick={() => setActivePage("history")}
        className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg text-center transform transition duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <Calendar className="w-10 h-10 text-purple-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          History
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          View past performance
        </p>
      </button>
    </div>
  </div>
);

// ✅ Subpages with dashboard-style cards
const GoalsPage = ({ onBack }) => (
  <SubPageWrapper
    title="Goals"
    icon={<Target className="w-7 h-7 text-blue-500" />}
    onBack={onBack}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🏋️ Workout
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Target: 4 times/week
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🥗 Nutrition
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Target: Maintain 2000 kcal/day
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🛌 Sleep
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Target: 8 hours daily
        </p>
      </div>
    </div>
  </SubPageWrapper>
);

const AchievementsPage = ({ onBack }) => (
  <SubPageWrapper
    title="Achievements"
    icon={<Award className="w-7 h-7 text-green-500" />}
    onBack={onBack}
  >
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🏆 30-day streak
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Worked out every day for 30 days straight
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🥇 First 5K run
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Completed a 5km run milestone
        </p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
          🔥 10,000 calories burned
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Burned over 10,000 calories this month
        </p>
      </div>
    </div>
  </SubPageWrapper>
);

const HistoryPage = ({ onBack }) => (
  <SubPageWrapper
    title="History"
    icon={<Calendar className="w-7 h-7 text-purple-500" />}
    onBack={onBack}
  >
    <div className="grid gap-6">
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          Sept 15
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">5km Run</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          Sept 12
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">Strength Training</p>
      </div>
      <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow hover:shadow-lg transition">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
          Sept 10
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">Yoga Session</p>
      </div>
    </div>
  </SubPageWrapper>
);

// ✅ Main Component
const Progress = () => {
  const [activePage, setActivePage] = useState("main");

  const renderPage = () => {
    switch (activePage) {
      case "goals":
        return <GoalsPage onBack={() => setActivePage("main")} />;
      case "achievements":
        return <AchievementsPage onBack={() => setActivePage("main")} />;
      case "history":
        return <HistoryPage onBack={() => setActivePage("main")} />;
      default:
        return <ProgressMain setActivePage={setActivePage} />;
    }
  };

  return <div className="space-y-8">{renderPage()}</div>;
};

export default Progress;
