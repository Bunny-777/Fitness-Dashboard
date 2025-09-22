import React from "react";
import { Minus, Plus, Droplets } from "lucide-react";
import { useApp } from "../../contexts/AppContext";

const WaterTracker = () => {
  const { fastingData, updateFastingData } = useApp();
  const [glassCount, setGlassCount] = React.useState(9);

  const handleWaterChange = (change: number) => {
    const newIntake = Math.max(0, fastingData.waterIntake + change * 150); // 150ml per glass
    updateFastingData({ waterIntake: newIntake });
    setGlassCount(Math.max(0, glassCount + change));
  };

  const progressPercentage =
    (fastingData.waterIntake / fastingData.waterGoal) * 100;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">
        Water
      </h3>

      {/* Water Progress Bar */}
      <div className="mb-6 relative">
        <div className="bg-blue-100 dark:bg-blue-900/30 rounded-full h-12 overflow-hidden">
          <div
            className="bg-gradient-to-r from-blue-400 to-blue-600 h-full rounded-full transition-all duration-500 flex items-center justify-end pr-4"
            style={{ width: `${Math.min(100, progressPercentage)}%` }}
          >
            {progressPercentage >= 20 && (
              <Droplets className="w-6 h-6 text-white" />
            )}
          </div>
        </div>

        {/* Progress Labels */}
        <div className="flex justify-between mt-2 px-1 text-xs font-medium text-gray-600 dark:text-gray-400">
          <span>Poor</span>
          <span>Good</span>
          <span>Almost</span>
          <span>Perfect!</span>
        </div>

        {/* Water Stats below the bar */}
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {fastingData.waterIntake} ml
            <span className="text-lg font-medium text-gray-500 dark:text-gray-400 ml-2">
              / {fastingData.waterGoal} ml
            </span>
          </div>
        </div>
      </div>

      {/* Glass Counter */}
      <div className="flex items-center justify-center space-x-6 mb-8">
        <button
          onClick={() => handleWaterChange(-1)}
          className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center hover:bg-orange-200 transition-colors duration-200"
        >
          <Minus className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2">
          <div className="w-12 h-16 bg-blue-500 rounded-lg flex items-center justify-center">
            <Droplets className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-blue-600">
            × {glassCount}
          </span>
        </div>

        <button
          onClick={() => handleWaterChange(1)}
          className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors duration-200"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default WaterTracker;
