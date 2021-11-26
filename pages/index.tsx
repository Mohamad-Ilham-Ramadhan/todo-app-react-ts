import {useEffect} from 'react';
// Components
import InputBar from '../components/InputBar';
import TodoList from '../components/TodoList';
import SwitchTheme from '../components/SwitchTheme';
import FiltersBar from '../components/FiltersBar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { setInitialTodos } from '../redux/reducers/todoListSlice';


export default function Home() {
  const todos = useAppSelector(state => state.todos);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // set initial todos
    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    if (savedTodos !== null) {
      dispatch(setInitialTodos(savedTodos));
    }
  }, [])

  useEffect(() => {
    // save to localStorage
    const todoJSON = JSON.stringify(todos);
    localStorage.setItem('todos', todoJSON);
  }, [todos])

  return (
    <div className="px-5 sm:pb-8 pb-16 dark:bg-mobile-dark sm:dark:bg-desktop-dark bg-mobile-light sm:bg-desktop-light bg-no-repeat bg-contain dark:bg-dark-theme-very-dark-blue bg-light-theme-very-light-gray min-h-screen text-xs sm:text-base"> 
      <div className="pt-10 sm:pt-13 w-full sm:w-124 mx-auto">
        <div className="flex text-white sm:mb-10 mb-7">
          <div className="mr-auto font-bold text-2xl sm:text-3.5xl tracking-title-mobile sm:tracking-title-desktop">TODO</div>
          <div className="flex items-center">
            <SwitchTheme></SwitchTheme>
          </div>
        </div>
        <InputBar className="mb-4 sm:mb-6" />
        <TodoList className="relative mb-4" />
        <FiltersBar className="relative sm:hidden"/>
        <div className="text-center text-sm dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue mt-9 sm:mt-11">Drag and drop to reorder list</div>
      </div>
    </div>
  );
}

