import React from 'react';
import { useApp } from '../../contexts/AppContext';
import Sidebar from './Sidebar';
import Header from './Header';
import ProfileSidebar from './ProfileSidebar';
import PageTransition from '../PageTransition';
import Activities from '../../pages/Activities';
import Nutrition from '../../pages/Nutrition';
import Fasting from '../../pages/Fasting';
import Progress from '../../pages/Progress';
import Settings from '../../pages/Settings';

const Layout = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'activities':
        return <Activities />;
      case 'nutrition':
        return <Nutrition />;
      case 'fasting':
        return <Fasting />;
      case 'progress':
        return <Progress />;
      case 'settings':
        return <Settings />;
      default:
        return <Activities />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Profile Sidebar */}
      <ProfileSidebar />
      
      {/* Main Content */}
      <div className="ml-64 mr-80 min-h-screen">
        <div className="p-8">
          <Header />
          <PageTransition>
            {renderPage()}
          </PageTransition>
        </div>
      </div>
      
      {/* Mobile overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" />
    </div>
  );
};

export default Layout;