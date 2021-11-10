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
    remove: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter( todo => todo.id !== action.payload );
    }
  }
});

export const { remove, add } = todoListSlice.actions;
export default todoListSlice.reducer;
