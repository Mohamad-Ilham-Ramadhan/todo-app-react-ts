import ButtonCheck from './ButtonCheck';
import { useAppSelector } from '../redux/hooks';

import List from './List';

export default function TodoList() {
  const todos = useAppSelector( state => state.todoList.todos );
  
  return (
    <ul className="dark:bg-dark-theme-very-dark-desaturated-blue bg-white rounded-md shadow">
      {todos.map( todo => (
        <List>{todo.title}</List>
      ))}
      <li className="flex py-4 pl-6 pr-3 dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue text-sm">
        <div className="w-full">5 items left</div>
        <div className="w-full flex">
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue text-primary-bright-blue">All</button>
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue">Active</button>
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue">Completed</button>
        </div>
        <button className="w-full dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue">Clear Completed</button>
      </li>
    </ul>
  );
}