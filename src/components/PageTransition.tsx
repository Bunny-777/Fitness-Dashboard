import React from 'react';
import { useApp } from '../contexts/AppContext';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition: React.FC<PageTransitionProps> = ({ children }) => {
  const { currentPage } = useApp();

  return (
    <div 
      key={currentPage}
      className="animate-in slide-in-from-right-4 duration-300 ease-out"
    >
      {children}
    </div>
  );
};

export default PageTransition;