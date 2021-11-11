import ButtonCheck from './ButtonCheck';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearCompleted, setFilter, Filter } from '../redux/reducers/todoListSlice';
import List from './List';
import clsx from 'clsx';

export default function TodoList() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector( state => state.filter );
  const todos = useAppSelector( state => state.todos );
  const labelRemaining = todos.length > 0 ? `${todos.length} items left` : 'nothing todo zzz';

  function handleFilter(filter: Filter) {
    dispatch(setFilter(filter));
  }

  const btnFilterClassName = 'mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue';
  const activeClassName = 'text-primary-bright-blue';
  const activeFilterAll = filter === 'all' ? activeClassName : '';
  const activeFilterActive = filter === 'active' ? activeClassName : '';
  const activeFilterCompleted = filter === 'completed' ? activeClassName : '';
  return (
    <ul className="dark:bg-dark-theme-very-dark-desaturated-blue bg-white rounded-md shadow-2xl">
      {todos.map( todo => (
        <List key={todo.id} id={todo.id} completed={todo.completed}>{todo.title}</List>
      ))}
      <li className="flex py-4 pl-6 pr-3 dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue text-sm">
        <div className="w-full font-bold">{labelRemaining}</div>
        <div className="w-full flex">
          <button 
            className={clsx(btnFilterClassName, activeFilterAll)}
            onClick={() => handleFilter('all')}
          >All</button>
          <button 
            className={clsx(btnFilterClassName, activeFilterActive)}
            onClick={() => handleFilter('active')}
          >Active</button>
          <button 
            className={clsx(btnFilterClassName, activeFilterCompleted)}
            onClick={() => handleFilter('completed')}
          >Completed</button>
        </div>
        <button 
          className="w-full dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue focus:outline-none"
          onClick={() => dispatch(clearCompleted())}
        >
          Clear Completed
        </button>
      </li>
    </ul>
  );
}