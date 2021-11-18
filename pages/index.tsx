import {useState} from 'react';
import InputBar from '../components/InputBar';
import TodoList from '../components/TodoList';
import SwitchTheme from '../components/SwitchTheme';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

export default function Home() {
  
  return (
    <Provider store={store}>
    <div className="dark:bg-mobile-dark sm:dark:bg-desktop-dark bg-mobile-light sm:bg-desktop-light bg-no-repeat bg-contain dark:bg-dark-theme-very-dark-blue bg-light-theme-very-light-gray min-h-screen text-xs sm:text-base"> 
      <div className="pt-11 sm:pt-13 sm:w-136 w-80 mx-auto">
        <div className="flex text-white mb-10">
          <div className="mr-auto font-bold text-2xl sm:text-4xl" style={{ letterSpacing: '.75rem' }}>TODO</div>
          <div className="flex items-center">
            <SwitchTheme></SwitchTheme>
          </div>
        </div>
        <InputBar style="mb-6" />
        <TodoList />
      </div>
    </div>
    </Provider>
  );
}

