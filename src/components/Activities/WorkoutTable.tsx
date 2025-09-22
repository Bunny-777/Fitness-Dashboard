import React from 'react';
import { useApp } from '../../contexts/AppContext';

const WorkoutTable = () => {
  const { workoutRecords } = useApp();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Recent Workout</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Workout</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Distance (kms)</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Duration (minutes)</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Date & Time</th>
              <th className="text-left py-3 text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Completion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {workoutRecords.map((workout) => (
              <tr key={workout.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-200">
                <td className="py-4 text-gray-900 dark:text-white font-medium">{workout.type}</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{workout.distance > 0 ? `${workout.distance} km` : '-'}</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{workout.duration} mins</td>
                <td className="py-4 text-gray-600 dark:text-gray-400">{new Date(workout.date).toLocaleString()}</td>
                <td className="py-4">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    workout.completion >= 25 ? 'bg-orange-100 text-orange-600' : 
                    workout.completion >= 20 ? 'bg-yellow-100 text-yellow-600' : 
                    'bg-red-100 text-red-600'
                  }`}>
                    {workout.completion}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkoutTable;