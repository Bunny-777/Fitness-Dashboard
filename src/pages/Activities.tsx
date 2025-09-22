import { useApp } from '../contexts/AppContext';
import ActivityCard from '../components/Activities/ActivityCard';
import ActivityChart from '../components/Activities/ActivityChart';
import WorkoutTable from '../components/Activities/WorkoutTable';

const Activities = () => {
  const { activityData } = useApp();

  return (
    <div className="space-y-8">
      {/* Activity Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <ActivityCard
          type="heart"
          value={activityData.heartRate}
          unit="bpm"
        />
        <ActivityCard
          type="steps"
          value={activityData.steps}
          goal={activityData.stepGoal}
        />
        <ActivityCard
          type="calories"
          value={activityData.calories}
          unit="kcal"
          subtitle={`${activityData.calorieGoal} kcal`}
        />
        <ActivityCard
          type="sleep"
          value={activityData.sleep}
          subtitle={`${activityData.sleepHours}h`}
        />
      </div>

      {/* Activity Chart */}
      <ActivityChart />

      {/* Recent Workouts */}
      <WorkoutTable />
    </div>
  );
};

export default Activities;