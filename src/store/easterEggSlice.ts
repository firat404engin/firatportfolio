import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface EasterEggState {
  matrixActive: boolean;
  snakeActive: boolean;
  demoActive: boolean;
  blogActive: boolean;
  projectsActive: boolean;
}

const initialState: EasterEggState = {
  matrixActive: false,
  snakeActive: false,
  demoActive: false,
  blogActive: false,
  projectsActive: false,
};

const easterEggSlice = createSlice({
  name: 'easterEgg',
  initialState,
  reducers: {
    setMatrixActive: (state, action: PayloadAction<boolean>) => {
      state.matrixActive = action.payload;
      if (action.payload) {
        state.snakeActive = false;
        state.demoActive = false;
        state.blogActive = false;
        state.projectsActive = false;
      }
    },
    setSnakeActive: (state, action: PayloadAction<boolean>) => {
      state.snakeActive = action.payload;
      if (action.payload) {
        state.matrixActive = false;
        state.demoActive = false;
        state.blogActive = false;
        state.projectsActive = false;
      }
    },
    setDemoActive: (state, action: PayloadAction<boolean>) => {
      state.demoActive = action.payload;
      if (action.payload) {
        state.matrixActive = false;
        state.snakeActive = false;
        state.blogActive = false;
        state.projectsActive = false;
      }
    },
    setBlogActive: (state, action: PayloadAction<boolean>) => {
      state.blogActive = action.payload;
      if (action.payload) {
        state.matrixActive = false;
        state.snakeActive = false;
        state.demoActive = false;
        state.projectsActive = false;
      }
    },
    setProjectsActive: (state, action: PayloadAction<boolean>) => {
      state.projectsActive = action.payload;
      if (action.payload) {
        state.matrixActive = false;
        state.snakeActive = false;
        state.demoActive = false;
        state.blogActive = false;
      }
    },
  },
});

export const {
  setMatrixActive,
  setSnakeActive,
  setDemoActive,
  setBlogActive,
  setProjectsActive,
} = easterEggSlice.actions;

export default easterEggSlice.reducer; 