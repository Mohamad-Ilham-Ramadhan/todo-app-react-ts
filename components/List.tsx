import ButtonCheck from './ButtonCheck';
import { useAppDispatch } from '../redux/hooks';
import { remove, toggleComplete } from '../redux/reducers/todoListSlice';

type Props = {
  children: string;
  id: string;
  completed: boolean;
}

type ToggleComplete = typeof toggleComplete;

export default function List({children, id, completed} : Props) {
  const dispatch = useAppDispatch();
  function handleRemove(id) {
    dispatch(remove(id));
  }
  function handleToggleComplete(id) {
    dispatch(toggleComplete(id));
  }

  const lineThrough = completed ? 'line-through text-light-theme-light-grayish-blue' : '';
  return (
    <li className="group flex py-5 pr-5 dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue border-b last:border-b-0 dark:border-dark-theme-darkest-grayish-blue border-light-theme-very-light-grayish-blue">
      <div className="px-6">
        <ButtonCheck onClick={() => handleToggleComplete(id)} checked={completed}/>
      </div>
      <div className={lineThrough}>{children}</div>
      <button className="flex justify-center items-center ml-auto focus:outline-none" onClick={() => handleRemove(id)}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="hidden group-hover:block">
          <path
            fill="#494C6B"
            fillRule="evenodd"
            d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"
          />
        </svg>
      </button>
    </li>
  );
}
