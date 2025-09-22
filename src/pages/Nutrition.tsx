import React from 'react';
import { useApp } from '../contexts/AppContext';
import MealCard from '../components/Nutrition/MealCard';
import CaloriePieChart from '../components/Nutrition/CaloriePieChart';
import NutritionBreakdown from '../components/Nutrition/NutritionBreakdown';

const Nutrition = () => {
  const { mealData } = useApp();

  return (
    <div className="space-y-8">
      {/* Meal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {mealData.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            isRecommended={meal.name === 'Recommended'}
          />
        ))}
      </div>

      {/* Charts and Nutrition Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CaloriePieChart />
        <NutritionBreakdown />
      </div>
    </div>
  );
};

export default Nutrition;