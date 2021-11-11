import clsx from 'clsx';
import {Filter} from '../redux/reducers/todoListSlice';

type Props = {
  children: string;
  active: boolean;
  onClick: () => void;
}

export default function ButtonFilter({active, children, onClick} : Props) {

  const btnFilterClassName = 'mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue focus:outline-none';
  const activeClassName =  active ? 'text-primary-bright-blue' : '';

  return (
    <button 
      className={clsx(btnFilterClassName, activeClassName)}
      onClick={onClick}
    >{children}</button>
  );
}