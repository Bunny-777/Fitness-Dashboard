import React, { createContext, useContext, useState } from 'react';
import { User, ActivityData, WorkoutRecord, MealData, NutritionData, FastingData, JournalEntry } from '../types';

interface AppContextType {
  user: User;
  updateUser: (user: Partial<User>) => void;
  currentPage: string;
  setCurrentPage: (page: string) => void;
  activityData: ActivityData;
  workoutRecords: WorkoutRecord[];
  mealData: MealData[];
  nutritionData: NutritionData;
  fastingData: FastingData;
  journalEntries: JournalEntry[];
  updateFastingData: (data: Partial<FastingData>) => void;
  addJournalEntry: (entry: JournalEntry) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({
    id: '1',
    name: 'John Watson',
    age: 34,
    weight: 70,
    height: 185,
  });

  const [currentPage, setCurrentPage] = useState('activities');

  const [activityData] = useState<ActivityData>({
    heartRate: 71,
    steps: 1962,
    stepGoal: 6000,
    calories: 759,
    calorieGoal: 3000,
    sleep: '7h 20m',
    sleepHours: 8,
  });

  const [workoutRecords] = useState<WorkoutRecord[]>([
    { id: '1', type: 'Running', distance: 3.2, duration: 32, date: '2025-09-22T02:30:20.852Z', completion: 25 },
    { id: '2', type: 'Swimming', distance: 1.4, duration: 25, date: '2025-09-22T01:30:20.852Z', completion: 16 },
    { id: '3', type: 'Walking', distance: 1.6, duration: 35, date: '2025-09-22T01:00:20.852Z', completion: 15 },
    { id: '4', type: 'Yoga', distance: 0, duration: 16, date: '2025-09-22T00:30:20.852Z', completion: 18 },
  ]);

  const [mealData] = useState<MealData[]>([
    { id: '1', type: 'Breakfast', name: 'Boiled Egg, Banana, Coffee', calories: 185, icon: '🍳', color: 'bg-red-100 text-red-600' },
    { id: '2', type: 'Snack', name: 'Apple, Orange, Coffee', calories: 166, icon: '☕', color: 'bg-yellow-100 text-yellow-600' },
    { id: '3', type: 'Lunch', name: 'Chicken Curry, Mixed Vegetables, Roti', calories: 408, icon: '🍽️', color: 'bg-purple-100 text-purple-600' },
    { id: '4', type: 'Snack', name: 'Recommended', calories: 185, icon: '🧁', color: 'bg-orange-100 text-orange-600' },
    { id: '5', type: 'Dinner', name: 'Recommended', calories: 440, icon: '🍽️', color: 'bg-blue-100 text-blue-600' },
  ]);

  const [nutritionData] = useState<NutritionData>({
    totalCalories: 759,
    goalCalories: 3000,
    consumedCalories: 597,
    burnedCalories: 597,
    macros: {
      proteins: 43.5,
      fat: 21.6,
      carbohydrates: 105.8,
    },
    minerals: {
      calcium: 230,
      sodium: 410,
      iron: 10,
    },
  });

  const [fastingData, setFastingData] = useState<FastingData>({
    startTime: '18:00',
    endTime: '10:00',
    currentTime: '02:36:36',
    isActive: true,
    waterIntake: 1350,
    waterGoal: 2400,
  });

  const [journalEntries] = useState<JournalEntry[]>([
    { id: '1', type: 'Morning Walk', description: '30m | 0.8km | 746.5', time: '7:00 AM' },
    { id: '2', type: 'Water Taken', description: '4 Glasses | 300ml', time: '7:40 AM' },
    { id: '3', type: 'Breakfast', description: 'Boiled Egg, Banana, Coffee | 185 kcal', time: '9:00 AM', calories: 185 },
    { id: '4', type: 'Snack', description: 'Apple, Orange, Coffee | 166 kcal', time: '11:00 AM', calories: 166 },
    { id: '5', type: 'Water Taken', description: '5 Glasses | 350ml', time: '12:00 PM' },
    { id: '6', type: 'Lunch', description: 'Chicken Curry, Mixed Vegetables, Roti | 408 kcal', time: '1:00 PM', calories: 408 },
  ]);

  const updateUser = (userData: Partial<User>) => {
    setUser(prev => ({ ...prev, ...userData }));
  };

  const updateFastingData = (data: Partial<FastingData>) => {
    setFastingData(prev => ({ ...prev, ...data }));
  };

  const addJournalEntry = (entry: JournalEntry) => {
    // In a real app, this would update the journal entries
    console.log('Adding journal entry:', entry);
  };

  return (
    <AppContext.Provider value={{
      user,
      updateUser,
      currentPage,
      setCurrentPage,
      activityData,
      workoutRecords,
      mealData,
      nutritionData,
      fastingData,
      journalEntries,
      updateFastingData,
      addJournalEntry,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};