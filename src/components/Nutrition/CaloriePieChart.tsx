import React from 'react';

const CaloriePieChart = () => {
  const data = [
    { label: 'Proteins', value: 26, color: '#10B981' },
    { label: 'Fat', value: 13, color: '#F97316' },
    { label: 'Carbohydrates', value: 61, color: '#EAB308' },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);
  let cumulativePercentage = 0;

  const createPath = (percentage: number, startPercentage: number) => {
    const startAngle = (startPercentage / 100) * 360;
    const endAngle = ((startPercentage + percentage) / 100) * 360;
    
    const startAngleRad = (startAngle * Math.PI) / 180;
    const endAngleRad = (endAngle * Math.PI) / 180;
    
    const largeArcFlag = percentage > 50 ? 1 : 0;
    
    const x1 = 50 + 40 * Math.cos(startAngleRad);
    const y1 = 50 + 40 * Math.sin(startAngleRad);
    const x2 = 50 + 40 * Math.cos(endAngleRad);
    const y2 = 50 + 40 * Math.sin(endAngleRad);
    
    return `M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Calorie Diet</h3>
      
      <div className="flex items-center justify-center">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 100 100" className="transform -rotate-90">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const path = createPath(percentage, cumulativePercentage);
              cumulativePercentage += percentage;
              
              return (
                <path
                  key={index}
                  d={path}
                  fill={item.color}
                  className="hover:opacity-80 transition-opacity duration-200 cursor-pointer"
                />
              );
            })}
            <circle cx="50" cy="50" r="25" fill="white" className="dark:fill-gray-800" />
          </svg>
          
          {/* Legend */}
          <div className="absolute -right-24 top-1/2 transform -translate-y-1/2 space-y-3">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <div>{item.label}</div>
                  <div className="font-semibold">{item.value}%</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaloriePieChart;