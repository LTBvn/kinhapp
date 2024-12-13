import { configureStore } from '@reduxjs/toolkit';
import tabCustomReducer from './counterSlice'; 

const store = configureStore({
  reducer: {
    tabCustom: tabCustomReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;