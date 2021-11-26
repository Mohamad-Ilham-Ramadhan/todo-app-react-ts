import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { clearCompleted, setFilter, Filter, Todo } from '../redux/reducers/todoListSlice';
import clsx from 'clsx';
// Components
import Draggable from 'react-draggable';
import List from './List';
import ButtonFilter from './ButtonFilter';

type Props = {
  children?: string;
  className?: string;
}

export default function TodoList({className} : Props) {
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

  return (
    <div className={clsx("dark:bg-dark-theme-very-dark-desaturated-blue bg-white rounded-md shadow-2xl", className)}>
      <ul className="list-container overflow-hidden rounded-sm">
        {filteredTodos.map( (todo, index) => (
          <List key={todo.id}  index={index} {...todo}>{todo.title}</List>
        ))}
      </ul>
      <div className="flex py-3 px-5 sm:py-4 sm:px-6 dark:text-dark-theme-very-dark-grayish-blue text-light-theme-dark-grayish-blue text-xs sm:text-sm">
        <div className="w-full h-6 flex items-center">{labelRemaining}</div>
        <div className="w-full hidden sm:flex">
          <ButtonFilter active={filter === 'all' ? true : false} onClick={() => handleFilter('all')}>All</ButtonFilter>
          <ButtonFilter active={filter === 'active' ? true : false} onClick={() => handleFilter('active')}>Active</ButtonFilter>
          <ButtonFilter active={filter === 'completed' ? true : false} onClick={() => handleFilter('completed')}>Completed</ButtonFilter>
        </div>
        <div className="w-full h-6 flex items-center justify-end">
          <button 
            className="dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue focus:outline-none"
            onClick={() => dispatch(clearCompleted())}
          >
            Clear Completed
          </button>
        </div>
      </div>
    </div>
  );
}