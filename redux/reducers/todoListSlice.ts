import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface TodoList {
  todos: Todo[]
}

const initialState: TodoList = {
  todos: []
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    remove: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.filter( todo => todo.id !== action.payload );
    },
    toggleComplete: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.map( todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo );
    }
  }
});
export const { remove, add, toggleComplete } = todoListSlice.actions;
export default todoListSlice.reducer;
