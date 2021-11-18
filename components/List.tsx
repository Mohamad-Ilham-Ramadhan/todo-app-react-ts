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

  const lineThrough = completed ? 'line-through text-light-theme-light-grayish-blue dark:text-dark-theme-very-dark-grayish-blue' : '';
  return (
    <li className="group flex py-3.5 px-5 sm:py-5 sm:px-6 dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue border-b last:border-b-0 dark:border-dark-theme-darkest-grayish-blue border-light-theme-very-light-grayish-blue">
      <div className="mr-3">
        <ButtonCheck onClick={() => handleToggleComplete(id)} checked={completed}/>
      </div>
      <div className={lineThrough}>{children}</div>
      <button className="flex sm:hidden sm:group-hover:flex justify-end items-center ml-auto focus:outline-none" onClick={() => handleRemove(id)}>
        <img src="/images/icon-cross.svg" alt="delete" className="w-4/6 sm:w-full"/>
      </button>
    </li>
  );
}
