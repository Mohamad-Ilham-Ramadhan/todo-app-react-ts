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
    animateTodo: ( state, action: PayloadAction<{id: string, y: number}>) => {
      const { y, id } = action.payload;
      const todo = state.todos.find( todo => todo.id === id);
      state.todos = state.todos.map( t => t.id === id ? {...todo, translateY: y} : t);
    },
    commitSwapTodo: (state, action: PayloadAction<Todo['id']>) => {
      const filter = state.filter;
      const droppedTodo = state.todos.find( todo => todo.id === action.payload);
      const droppedTodoIndex = state.todos.findIndex( todo => todo.id === action.payload);
      const swapCount = droppedTodo.swapCount;
      console.log('filter:', filter, 'droppedTodo:', droppedTodo, 'droppedTodoIndex:', droppedTodoIndex, 'swapCount:', swapCount);
      if (filter === 'all') {
        let newTodos : Todo[] = state.todos.slice();
        if (swapCount === 0) {
          return; 
        } else  {
          newTodos.splice(droppedTodoIndex, 1);
          newTodos.splice(droppedTodoIndex + swapCount, 0, {...droppedTodo, swapCount: 0});
        } 
        state.todos = newTodos.map( t => ({...t, translateY: 0}));
      } else {
        let newTodos = state.todos.slice();
        let filteredTodos : Todo[];
        if (filter === 'completed') {
          filteredTodos = state.todos.filter( t => t.completed);
        } else if (filter === 'active') {
          filteredTodos = state.todos.filter( t => !t.completed);
        }
        const droppedTodoIndex = filteredTodos.findIndex(t => t.id === action.payload);
        const filteredIndexes = state.todos.reduce((pv, cv, index) => {
          console.log(pv);
          const filteredIds = filteredTodos.map(t => t.id);
          if ( filteredIds.includes(cv.id) ) {
              pv.push(index);
          }
          return pv;
        }, []);
        if (swapCount === 0) {
          return;
        } else  {
          filteredTodos.splice(droppedTodoIndex, 1);
          filteredTodos.splice(droppedTodoIndex + swapCount, 0, {...droppedTodo, swapCount: 0});
          filteredIndexes.reduce( (counter, i) => {
            console.log(i);
            newTodos.splice(i, 1, filteredTodos[counter]);
            return counter + 1;
          }, 0);
        } 
        state.todos = newTodos.map( t => ({...t, translateY: 0}));
      }
    },
    
  }
});
export const { remove, add, toggleComplete, input, toggleCheckInput, clearCompleted, setFilter, setSwapCount, animateTodo, commitSwapTodo } = todoListSlice.actions;
export default todoListSlice.reducer;
