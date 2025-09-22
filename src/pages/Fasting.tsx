import React from 'react';
import FastingTimer from '../components/Fasting/FastingTimer';
import WaterTracker from '../components/Fasting/WaterTracker';
import WeightChart from '../components/Fasting/WeightChart';

const Fasting = () => {
  return (
    <div className="space-y-8">
      {/* Fasting Timer and Water Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FastingTimer />
        <WaterTracker />
      </div>

      {/* Weight Journey Chart */}
      <WeightChart />
    </div>
  );
};

export default Fasting;