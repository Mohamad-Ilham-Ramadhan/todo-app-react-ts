import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface InputBar {
  text: string;
  checked: boolean;
}

export interface TodoList {
  todos: Todo[];
  inputBar: InputBar
}

const initialState: TodoList = {
  todos: [],
  inputBar: { text: '', checked: false}
};

export const todoListSlice = createSlice({
  name: 'todoList',
  initialState,
  reducers: {
    input: (state, action: PayloadAction<string>) => {
      state.inputBar.text = action.payload;
    },
    toggleCheckInput: (state) => {
      state.inputBar.checked = !state.inputBar.checked;
    },
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
export const { remove, add, toggleComplete, input, toggleCheckInput } = todoListSlice.actions;
export default todoListSlice.reducer;
