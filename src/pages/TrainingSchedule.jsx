import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, addDays, startOfWeek } from 'date-fns';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { getIcon } from '../utils/iconUtils';
import { incrementDifficulty, completeWorkout } from '../redux/trainingSlice';

// Icons
const ShieldLockIcon = getIcon('shield-lock');
const MoonIcon = getIcon('moon');
const SunIcon = getIcon('sun');
const DumbbellIcon = getIcon('dumbbell');
const CalendarIcon = getIcon('calendar');
const TrendingUpIcon = getIcon('trending-up');
const CheckCircleIcon = getIcon('check-circle');
const LogOutIcon = getIcon('log-out');

function TrainingSchedule({ isDarkMode, toggleDarkMode }) {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { workouts, difficultyLevel } = useSelector(state => state.training);
  
  const [selectedDay, setSelectedDay] = useState(new Date().getDay());
  const [completedWorkouts, setCompletedWorkouts] = useState([]);
  
  // Generate week days starting from the current week
  const startDate = startOfWeek(new Date(), { weekStartsOn: 1 }); // Start from Monday
  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = addDays(startDate, i);
    return {
      date,
      dayName: format(date, 'EEEE'),
      shortName: format(date, 'EEE'),
      dayOfMonth: format(date, 'd')
    };
  });
  
  useEffect(() => {
    // Simulate increasing difficulty over time (in a real app, this might be tied to user progress)
    const interval = setInterval(() => {
      dispatch(incrementDifficulty());
    }, 60000); // Increase difficulty every minute for demo purposes
    
    return () => clearInterval(interval);
  }, [dispatch]);
  
  const handleWorkoutComplete = (workoutId) => {
    if (completedWorkouts.includes(workoutId)) {
      return;
    }
    
    setCompletedWorkouts([...completedWorkouts, workoutId]);
    dispatch(completeWorkout(workoutId));
    toast.success('Workout completed! Great job!');
  };
  
  const getDifficultyLabel = (level) => {
    if (level <= 2) return 'Beginner';
    if (level <= 4) return 'Intermediate';
    if (level <= 6) return 'Advanced';
    if (level <= 8) return 'Expert';
    return 'Master';
  };
  
  const getDifficultyColor = (level) => {
    if (level <= 2) return 'bg-green-500';
    if (level <= 4) return 'bg-blue-500';
    if (level <= 6) return 'bg-yellow-500';
    if (level <= 8) return 'bg-orange-500';
    return 'bg-red-500';
  };
  
  return (
    <motion.div
      className="min-h-screen flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-surface-900/80 backdrop-blur-md border-b border-surface-200 dark:border-surface-800">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <ShieldLockIcon className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">SecureGate</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="hidden md:flex items-center mr-4">
                <DumbbellIcon className="h-5 w-5 text-primary mr-2" />
                <span className="text-sm font-medium">
                  Overall Difficulty: <span className="text-primary font-bold">{getDifficultyLabel(difficultyLevel)}</span>
                </span>
              </div>
              
              <button 
                onClick={toggleDarkMode} 
                className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors"
                aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDarkMode ? (
                  <SunIcon className="h-5 w-5 text-yellow-400" />
                ) : (
                  <MoonIcon className="h-5 w-5 text-surface-600" />
                )}
              </button>
              
              <Link to="/" className="p-2 rounded-full hover:bg-surface-200 dark:hover:bg-surface-800 transition-colors">
                <LogOutIcon className="h-5 w-5 text-surface-600 dark:text-surface-400" />
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <section className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <motion.h1 
                className="mb-4 text-3xl md:text-4xl lg:text-5xl font-bold"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Your <span className="text-primary">Training Schedule</span>
              </motion.h1>
              <motion.p 
                className="text-lg md:text-xl text-surface-600 dark:text-surface-400 max-w-2xl mx-auto"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Welcome back, {user?.name || 'Athlete'}! Your personalized workout plan awaits.
              </motion.p>
            </div>
            
            {/* Week Days Navigation */}
            <motion.div
              className="mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold flex items-center">
                  <CalendarIcon className="h-5 w-5 mr-2 text-primary" />
                  Weekly Schedule
                </h2>
                <div className="flex items-center">
                  <TrendingUpIcon className="h-5 w-5 mr-2 text-primary" />
                  <span className="text-sm font-medium">Difficulty increases over time</span>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-2 sm:gap-4">
                {weekDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDay(index)}
                    className={`p-2 sm:p-3 rounded-lg text-center transition-all ${
                      selectedDay === index
                        ? 'bg-primary text-white shadow-md'
                        : 'bg-surface-200 dark:bg-surface-800 hover:bg-surface-300 dark:hover:bg-surface-700'
                    }`}
                  >
                    <div className="text-xs sm:text-sm font-medium">{day.shortName}</div>
                    <div className="text-lg sm:text-xl font-bold mt-1">{day.dayOfMonth}</div>
                  </button>
                ))}
              </div>
            </motion.div>
            
            {/* Workouts for Selected Day */}
            <motion.div
              className="space-y-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-2xl font-semibold">
                {weekDays[selectedDay].dayName}'s Workouts
              </h3>
              
              {workouts
                .filter(workout => workout.dayIndex === selectedDay)
                .map((workout, index) => {
                  // Calculate workout difficulty based on base difficulty plus global progression
                  const workoutDifficulty = Math.min(10, workout.baseDifficulty + difficultyLevel);
                  const isCompleted = completedWorkouts.includes(workout.id);
                  
                  return (
                    <motion.div
                      key={workout.id}
                      className={`card p-6 ${isCompleted ? 'opacity-75' : ''}`}
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 + (index * 0.1) }}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                        <div className="mb-4 sm:mb-0">
                          <h4 className="text-xl font-semibold flex items-center">
                            {workout.title}
                            {isCompleted && (
                              <CheckCircleIcon className="ml-2 h-5 w-5 text-green-500" />
                            )}
                          </h4>
                          <p className="text-surface-600 dark:text-surface-400 mt-1">
                            {workout.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {workout.exercises.map((exercise, i) => (
                              <span 
                                key={i}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-light bg-opacity-10 text-primary-dark"
                              >
                                {exercise}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end">
                          <div className="flex items-center mb-2">
                            <span className="text-sm font-medium mr-2">Difficulty:</span>
                            <div className="w-32 h-2 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                              <div
                                className={`h-full ${getDifficultyColor(workoutDifficulty)}`}
                                style={{ width: `${(workoutDifficulty / 10) * 100}%` }}
                              />
                            </div>
                            <span className="ml-2 text-sm font-medium">{workoutDifficulty}/10</span>
                          </div>
                          <button
                            onClick={() => handleWorkoutComplete(workout.id)}
                            disabled={isCompleted}
                            className={`btn ${isCompleted ? 'bg-green-500 cursor-not-allowed' : 'btn-primary'}`}
                          >
                            {isCompleted ? 'Completed' : 'Mark Complete'}
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
            </motion.div>
          </section>
        </div>
      </main>
    </motion.div>
  );
}

export default TrainingSchedule;