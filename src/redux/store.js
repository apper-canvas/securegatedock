import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import trainingReducer from './trainingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    training: trainingReducer,
  },
});

export default store;
