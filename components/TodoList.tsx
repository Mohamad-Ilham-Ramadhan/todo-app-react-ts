import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearCompleted, setFilter, Filter, Todo } from '../redux/reducers/todoListSlice';
import clsx from 'clsx';
// Components
import List from './List';
import ButtonFilter from './ButtonFilter';

export default function TodoList() {
  const dispatch = useAppDispatch();
  const filter = useAppSelector( state => state.filter );
  const todos = useAppSelector( state => state.todos );
  const activeTodos = todos.filter( todo => !todo.completed);
  const labelRemaining = activeTodos.length > 0 ? `${activeTodos.length} items left` : 'nothing todo zzz';
  let filteredTodos : Todo[];

  if ( filter === 'all') {
    filteredTodos = todos;
  } else if ( filter === 'active' ) {
    filteredTodos = activeTodos;
  } else if ( filter === 'completed' ) {
    filteredTodos = todos.filter( todo => todo.completed );
  }

  function handleFilter(filter: Filter) {
    dispatch(setFilter(filter));
  }

  const btnFilterClassName = 'mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue focus:outline-none';
  const activeClassName = 'text-primary-bright-blue';
  const activeFilterAll = filter === 'all' ? activeClassName : '';
  const activeFilterActive = filter === 'active' ? activeClassName : '';
  const activeFilterCompleted = filter === 'completed' ? activeClassName : '';
  return (
    <ul className="dark:bg-dark-theme-very-dark-desaturated-blue bg-white rounded-md shadow-2xl">
      {filteredTodos.map( todo => (
        <List key={todo.id} id={todo.id} completed={todo.completed}>{todo.title}</List>
      ))}
      <li className="flex py-4 pl-6 pr-3 dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue text-sm">
        <div className="w-full font-bold">{labelRemaining}</div>
        <div className="w-full flex">
          <ButtonFilter active={filter === 'all' ? true : false} onClick={() => handleFilter('all')}>All</ButtonFilter>
          <ButtonFilter active={filter === 'active' ? true : false} onClick={() => handleFilter('active')}>Active</ButtonFilter>
          <ButtonFilter active={filter === 'completed' ? true : false} onClick={() => handleFilter('completed')}>Completed</ButtonFilter>
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