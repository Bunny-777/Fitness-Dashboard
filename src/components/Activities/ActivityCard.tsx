import React from 'react';
import { Heart, Footprints, Flame, Moon } from 'lucide-react';

interface ActivityCardProps {
  type: 'heart' | 'steps' | 'calories' | 'sleep';
  value: string | number;
  unit?: string;
  goal?: number;
  subtitle?: string;
}

const ActivityCard: React.FC<ActivityCardProps> = ({ type, value, unit, goal, subtitle }) => {
  const getCardConfig = () => {
    switch (type) {
      case 'heart':
        return {
          icon: Heart,
          title: 'Heart Rate',
          bg: 'bg-gradient-to-br from-blue-400 to-blue-600',
          iconColor: 'text-white',
        };
      case 'steps':
        return {
          icon: Footprints,
          title: 'Steps',
          bg: 'bg-gradient-to-br from-pink-400 to-pink-600',
          iconColor: 'text-white',
        };
      case 'calories':
        return {
          icon: Flame,
          title: 'Calories',
          bg: 'bg-gradient-to-br from-orange-400 to-orange-600',
          iconColor: 'text-white',
        };
      case 'sleep':
        return {
          icon: Moon,
          title: 'Sleep',
          bg: 'bg-gradient-to-br from-teal-400 to-teal-600',
          iconColor: 'text-white',
        };
      default:
        return {
          icon: Heart,
          title: 'Activity',
          bg: 'bg-gradient-to-br from-gray-400 to-gray-600',
          iconColor: 'text-white',
        };
    }
  };

  const config = getCardConfig();
  const Icon = config.icon;

  return (
    <div className={`${config.bg} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 cursor-pointer`}>
      <div className="flex items-center justify-between mb-4">
        <Icon className={`w-6 h-6 ${config.iconColor}`} />
        <h3 className="text-sm font-medium opacity-90">{config.title}</h3>
      </div>
      
      <div className="space-y-1">
        <div className="flex items-end space-x-1">
          <span className="text-3xl font-bold">{value}</span>
          {unit && <span className="text-lg opacity-75">{unit}</span>}
        </div>
        
        {subtitle && (
          <p className="text-sm opacity-75">{subtitle}</p>
        )}
        
        {goal && (
          <p className="text-sm opacity-75">{goal}</p>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;