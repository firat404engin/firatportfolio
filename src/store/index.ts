import { configureStore } from '@reduxjs/toolkit';
import easterEggReducer from './easterEggSlice';

export const store = configureStore({
  reducer: {
    easterEgg: easterEggReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 