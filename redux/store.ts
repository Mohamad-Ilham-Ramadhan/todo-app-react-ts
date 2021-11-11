import { configureStore } from '@reduxjs/toolkit';
import todoList from './reducers/todoListSlice';

export const store = configureStore({
  reducer: todoList
});

// Infer the 'RootState' and 'AppDispatch' types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

