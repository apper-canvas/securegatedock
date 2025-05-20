import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  difficultyLevel: 1,  // Starting difficulty (scales from 1-10)
  completedWorkouts: [],
  workouts: [
    // Monday workouts
    {
      id: 'mon-1',
      dayIndex: 0,
      title: 'Upper Body Strength',
      description: 'Focus on chest, shoulders, and triceps with compound movements',
      baseDifficulty: 2,
      exercises: ['Bench Press', 'Shoulder Press', 'Tricep Dips', 'Push-ups'],
      duration: 45
    },
    {
      id: 'mon-2',
      dayIndex: 0,
      title: 'Core Conditioning',
      description: 'Strengthen your core with various abdominal exercises',
      baseDifficulty: 1,
      exercises: ['Planks', 'Russian Twists', 'Leg Raises', 'Mountain Climbers'],
      duration: 30
    },
    // Tuesday workouts
    {
      id: 'tue-1',
      dayIndex: 1,
      title: 'Lower Body Power',
      description: 'Build leg strength and power with compound movements',
      baseDifficulty: 3,
      exercises: ['Squats', 'Lunges', 'Deadlifts', 'Calf Raises'],
      duration: 50
    },
    // Wednesday workouts
    {
      id: 'wed-1',
      dayIndex: 2,
      title: 'Active Recovery',
      description: 'Light cardio and stretching to promote recovery',
      baseDifficulty: 1,
      exercises: ['Walking', 'Light Cycling', 'Stretching', 'Foam Rolling'],
      duration: 40
    },
    // Thursday workouts
    {
      id: 'thu-1',
      dayIndex: 3,
      title: 'Back and Biceps',
      description: 'Focus on back strength and bicep development',
      baseDifficulty: 2,
      exercises: ['Pull-ups', 'Rows', 'Bicep Curls', 'Face Pulls'],
      duration: 45
    },
    // Friday workouts
    {
      id: 'fri-1',
      dayIndex: 4,
      title: 'HIIT Training',
      description: 'High-intensity interval training for cardiovascular fitness',
      baseDifficulty: 4,
      exercises: ['Burpees', 'Sprints', 'Jump Squats', 'Mountain Climbers'],
      duration: 30
    },
    // Saturday workouts
    {
      id: 'sat-1',
      dayIndex: 5,
      title: 'Full Body Strength',
      description: 'Comprehensive workout targeting all major muscle groups',
      baseDifficulty: 3,
      exercises: ['Deadlifts', 'Push Press', 'Pull-ups', 'Squats'],
      duration: 60
    },
    // Sunday workouts
    {
      id: 'sun-1',
      dayIndex: 6,
      title: 'Rest and Recover',
      description: 'Focus on stretching, mobility, and proper recovery',
      baseDifficulty: 1,
      exercises: ['Yoga', 'Stretching', 'Meditation', 'Foam Rolling'],
      duration: 40
    }
  ]
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    incrementDifficulty: (state) => {
      state.difficultyLevel = Math.min(10, state.difficultyLevel + 0.2);
    },
    completeWorkout: (state, action) => {
      state.completedWorkouts.push(action.payload);
    },
  },
});

export const { incrementDifficulty, completeWorkout } = trainingSlice.actions;

export default trainingSlice.reducer;
