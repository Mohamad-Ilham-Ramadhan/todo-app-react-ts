import ButtonCheck from './ButtonCheck';

import List from './List';

export default function TodoList() {

  return (
    <ul className="dark:bg-dark-theme-very-dark-desaturated-blue bg-white rounded-md shadow">
      <List>Learn react typescript and TDD</List>
      <List>Lets go</List>
      <List>Workout boy!</List>
      <li className="flex py-4 pl-6 pr-3 dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue text-sm">
        <div className="w-full">5 items left</div>
        <div className="w-full flex">
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue text-primary-bright-blue">All</button>
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue">Active</button>
          <button className="mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue">Completed</button>
        </div>
        <button className="w-full hover:text-dark-theme-light-grayish-blue-hover">Clear Completed</button>
      </li>
    </ul>
  );
}