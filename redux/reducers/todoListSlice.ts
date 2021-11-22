import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  swapCount: number;
  translateY: number;
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
        completed: state.inputBar.checked,
        swapCount: 0,
        translateY: 0,
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
    setSwapCount: ( state, action: PayloadAction<{id: Todo['id'], direction: 'bottom' | 'top'}>) => {
      const { id, direction } = action.payload;
      state.todos = state.todos.map( todo => {
        if (todo.id === id) {
          if ( direction === 'bottom') {
            return { ...todo, swapCount: todo.swapCount + 1};
          } else if ( direction === 'top') {
            return { ...todo, swapCount: todo.swapCount - 1};
          }
        } else {
          return todo;
        }
      });
    },
    animateTodo: ( state, action: PayloadAction<{index: number, y: number}>) => {
      const { index, y } = action.payload;
      const todo = state.todos[index];
      state.todos = state.todos.map( t => t.id === todo.id ? {...todo, translateY: y} : t);
      console.log('state todos animate',state.todos);
    },
    commitSwapTodo: (state, action: PayloadAction<Todo['id']>) => {
      const droppedTodo = state.todos.find( todo => todo.id === action.payload);
      const droppedTodoIndex = state.todos.findIndex( todo => todo.id === action.payload);
      const swapCount = droppedTodo.swapCount;
      console.log('index:', droppedTodoIndex, 'swapCount:', droppedTodo.swapCount);
      let newTodos : Todo[];
      if (swapCount > 0) {
        newTodos = state.todos.slice();
        newTodos.splice(droppedTodoIndex, 1);
        newTodos.splice(droppedTodoIndex + swapCount, 0, {...droppedTodo, swapCount: 0});
        console.log('newTodos: ', newTodos);
      } else if (swapCount < 0) {
        newTodos = state.todos.slice();
        newTodos.splice(droppedTodoIndex, 1);
        newTodos.splice(droppedTodoIndex + swapCount, 0, {...droppedTodo, swapCount: 0});
        // newTodos = state.todos.slice(0, droppedTodoIndex + swapCount);
        // newTodos.push({...droppedTodo, swapCount: 0 });
        // newTodos = newTodos.concat(state.todos.slice(droppedTodoIndex + swapCount, droppedTodoIndex), state.todos.slice(droppedTodoIndex + 1));
      } else if (swapCount === 0) {
        return;
      }
      state.todos = newTodos.map( t => ({...t, translateY: 0}));
    },
    
  }
});
export const { remove, add, toggleComplete, input, toggleCheckInput, clearCompleted, setFilter, setSwapCount, animateTodo, commitSwapTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
