import React, { useState, useEffect } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import { useApp } from '../../contexts/AppContext';

// Helper function to format seconds into HH:MM:SS
const formatTime = (totalSeconds) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return [hours, minutes, seconds]
    .map(val => val.toString().padStart(2, '0'))
    .join(':');
};

// Helper function to format time for display (e.g., 10:30 AM)
const formatDisplayTime = (dateString) => {
  if (!dateString) return '--:--';
  return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};


const FastingTimer = () => {
  const { fastingData, updateFastingData } = useApp();
  // State to hold the number of seconds elapsed since the fast started
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // --- Core Timer Logic ---
  useEffect(() => {
    let interval = null;

    if (fastingData.isActive && fastingData.startTime) {
      // Set an interval to update the timer every second
      interval = setInterval(() => {
        const now = new Date();
        const start = new Date(fastingData.startTime);
        // Calculate the difference in seconds and update the state
        setElapsedSeconds(Math.floor((now - start) / 1000));
      }, 1000);
    }

    // Cleanup function to clear the interval when the component unmounts or fasting stops
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [fastingData.isActive, fastingData.startTime]);

  // --- Derived Values for UI ---
  const startTime = fastingData.startTime ? new Date(fastingData.startTime) : null;
  const endTime = fastingData.endTime ? new Date(fastingData.endTime) : null;

  // Calculate total duration only if start and end times are valid
  const totalDuration = startTime && endTime ? (endTime - startTime) / 1000 : 0;
  
  // Calculate remaining time, ensuring it doesn't go below zero
  const remainingSeconds = Math.max(0, totalDuration - elapsedSeconds);
  
  // Calculate progress as a value between 0 and 1
  const progress = totalDuration > 0 ? Math.min(elapsedSeconds / totalDuration, 1) : 0;

  // --- SVG Circle Calculations ---
  const radius = 90;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  // --- Control Handlers ---
  const handleToggleFasting = () => {
    if (fastingData.isActive) {
      // Pausing is simply setting isActive to false
      updateFastingData({ isActive: false });
    } else {
      // Starting a new fast (e.g., a standard 16-hour fast)
      const now = new Date();
      const end = new Date(now.getTime() + 16 * 60 * 60 * 1000); // 16 hours from now
      updateFastingData({
        isActive: true,
        startTime: now.toISOString(),
        endTime: end.toISOString(),
      });
      setElapsedSeconds(0); // Reset elapsed time
    }
  };

  const handleEndFasting = () => {
    updateFastingData({
      isActive: false,
      startTime: null,
      endTime: null,
    });
    setElapsedSeconds(0); // Reset elapsed time
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-8">Fasting</h3>

      <div className="flex justify-center mb-6 relative">
        {/* Circular progress */}
        <svg width="200" height="200" viewBox="0 0 200 200" className="transform -rotate-90">
          <circle cx="100" cy="100" r={radius} fill="none" stroke="#E5E7EB" strokeWidth="8" />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#FF6B35"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset} // Dynamic offset based on progress
            className="transition-all duration-300"
          />
        </svg>

        {/* Timer display */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
            {formatTime(elapsedSeconds)}
          </div>
          <div className="text-sm text-orange-500">
            {/* Display formatted remaining time */}
            Left {Math.floor(remainingSeconds / 3600)}h {Math.floor((remainingSeconds % 3600) / 60)}m
          </div>
        </div>
      </div>

      {/* Labels below circle */}
      <div className="flex justify-between mb-8 px-4 text-sm text-gray-500 dark:text-gray-400">
        <div className="text-center">
          <div className="font-medium">Elapsed Time</div>
          {/* Dynamic percentage */}
          <div>{Math.round(progress * 100)}%</div>
        </div>
        <div className="text-center">
          <div className="font-medium">Fasting Progress</div>
          <div>{fastingData.isActive ? 'Active' : 'Paused'}</div>
        </div>
      </div>

      {/* Fasting Schedule */}
      <div className="flex justify-between items-center mb-8">
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Started Fasting</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatDisplayTime(fastingData.startTime)}
          </div>
        </div>
        <div className="text-center">
          <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">End Fasting</div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            {formatDisplayTime(fastingData.endTime)}
          </div>
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex space-x-4">
        <button
          onClick={handleToggleFasting}
          className="flex-1 bg-orange-100 text-orange-600 py-3 px-6 rounded-lg font-medium hover:bg-orange-200 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          {fastingData.isActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          <span>{fastingData.isActive ? 'PAUSE' : 'START'} FASTING</span>
        </button>
        <button
          onClick={handleEndFasting}
          disabled={!fastingData.isActive && !fastingData.startTime}
          className="flex-1 bg-orange-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-orange-600 transition-colors duration-200 flex items-center justify-center space-x-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          <Square className="w-4 h-4" />
          <span>END FASTING</span>
        </button>
      </div>
    </div>
  );
};

export default FastingTimer;  