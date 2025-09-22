import React from 'react';
import { useApp } from '../../contexts/AppContext';

const NutritionBreakdown = () => {
  const { nutritionData } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      {/* Calorie Summary */}
      <div className="text-center mb-8">
        <div className="text-sm text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
          Consumed Calories
        </div>
        <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">
          {nutritionData.totalCalories}
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          kcal / {nutritionData.goalCalories} kcal
        </div>
        
        <div className="mt-4 flex justify-between text-sm">
          <div className="text-center">
            <div className="text-gray-500 dark:text-gray-400 uppercase tracking-wide text-xs">Burned Calories</div>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">{nutritionData.burnedCalories}</div>
            <div className="text-gray-500 dark:text-gray-400 text-xs">kcal</div>
          </div>
        </div>
      </div>

      {/* Macronutrients */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Proteins</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.macros.proteins} gm</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-orange-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Fat</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.macros.fat} gm</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Carbohydrates</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.macros.carbohydrates} gm</div>
        </div>
      </div>

      {/* Minerals */}
      <div className="grid grid-cols-3 gap-6">
        <div className="text-center">
          <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Calcium</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.minerals.calcium} mg</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Sodium</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.minerals.sodium} mg</div>
        </div>
        <div className="text-center">
          <div className="w-3 h-3 bg-pink-500 rounded-full mx-auto mb-2"></div>
          <div className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">Iron</div>
          <div className="text-xl font-bold text-gray-900 dark:text-white">{nutritionData.minerals.iron} mg</div>
        </div>
      </div>
    </div>
  );
};

export default NutritionBreakdown;