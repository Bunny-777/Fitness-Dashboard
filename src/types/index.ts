export interface User {
  id: string;
  name: string;
  age: number;
  weight: number;
  height: number;
  avatar?: string;
}

export interface ActivityData {
  heartRate: number;
  steps: number;
  stepGoal: number;
  calories: number;
  calorieGoal: number;
  sleep: string;
  sleepHours: number;
}

export interface WorkoutRecord {
  id: string;
  type: string;
  distance: number;
  duration: number;
  date: string;
  completion: number;
}

export interface MealData {
  id: string;
  type: string;
  name: string;
  calories: number;
  icon: string;
  color: string;
  items?: string[];
}

export interface NutritionData {
  totalCalories: number;
  goalCalories: number;
  consumedCalories: number;
  burnedCalories: number;
  macros: {
    proteins: number;
    fat: number;
    carbohydrates: number;
  };
  minerals: {
    calcium: number;
    sodium: number;
    iron: number;
  };
}

export interface FastingData {
  startTime: string;
  endTime: string;
  currentTime: string;
  isActive: boolean;
  waterIntake: number;
  waterGoal: number;
}

export interface JournalEntry {
  id: string;
  type: string;
  description: string;
  time: string;
  calories?: number;
  details?: string;
}