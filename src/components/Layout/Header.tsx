import React from 'react';
import { useApp } from '../../contexts/AppContext';

const Header = () => {
  const { user, currentPage } = useApp();

  const getPageTitle = () => {
    switch (currentPage) {
      case 'activities':
        return 'My Activities';
      case 'nutrition':
        return '5 Course Meals';
      case 'fasting':
        return 'Fasting';
      case 'progress':
        return 'Progress';
      case 'settings':
        return 'Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <div className="flex justify-between items-start mb-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        {getPageTitle()}
      </h1>
      
      <div className="text-right">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {new Date().toLocaleDateString('en-US', { 
            month: 'numeric',
            day: 'numeric',
            year: 'numeric'
          })}
        </div>
      </div>
    </div>
  );
};

export default Header;