import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export interface InputBar {
  text: string;
  checked: boolean;
}

export type Filter = 'all' | 'active' | 'completed';
export interface TodoList {
  todos: Todo[];
  filter: Filter;
  inputBar: InputBar;
}

const initialState: TodoList = {
  todos: [],
  inputBar: { text: '', checked: false},
  filter: 'all'
};
export type SwapDirection = 'top' | 'bottom';
export type SwapTodo = {
  id: string;
  direction: SwapDirection;
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
    add: (state) => {
      const todo: Todo = {
        id: uuidv4(),
        title: state.inputBar.text,
        completed: state.inputBar.checked
      }
      state.todos.push(todo);
      state.inputBar.text = '';
      state.inputBar.checked = false;
    },
    remove: (state, action: PayloadAction<Todo['id']>) => {
      state.todos = state.todos.filter( todo => todo.id !== action.payload );
    },
    toggleComplete: (state, action: PayloadAction<Todo['id']>) => {
      console.log(state.todos.find( todo => todo.id === action.payload));
      state.todos = state.todos.map( todo => todo.id === action.payload ? {...todo, completed: !todo.completed} : todo );
    },
    clearCompleted: (state) => {
      state.todos = state.todos.filter( todo => !todo.completed );
    },
    setFilter: (state, action: PayloadAction<Filter>) => {
      state.filter = action.payload;
    },
    swapTodo: (state, action: PayloadAction<SwapTodo>) => {
      const { id, direction } = action.payload;
      const activeTodo = state.todos.find( todo => todo.id === id);
      const indexTodo = state.todos.findIndex( todo => todo.id === id);
      console.log(indexTodo, activeTodo);
      let newTodos = [...state.todos];
      if ( direction === 'bottom') {
        newTodos[indexTodo] = state.todos[indexTodo + 1];
        newTodos[indexTodo + 1] = activeTodo; 
      } else if (direction === 'top') {
        newTodos[indexTodo] = state.todos[indexTodo - 1];
        newTodos[indexTodo - 1] = activeTodo; 
      }
      state.todos = newTodos;
    }
  }
});
export const { remove, add, toggleComplete, input, toggleCheckInput, clearCompleted, setFilter, swapTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
