import clsx from 'clsx';

type Props = {
  children: string;
  active: boolean;
  onClick: () => void;
}

export default function ButtonFilter({active, children, onClick} : Props) {

  const btnFilterClassName = 'mx-2 font-bold dark:hover:text-dark-theme-light-grayish-blue-hover hover:text-light-theme-very-dark-grayish-blue focus:outline-none';
  const activeClassName =  active ? 'text-primary-bright-blue' : 'text-light-theme-dark-grayish-blue dark:text-dark-theme-very-dark-grayish-blue';

  return (
    <button 
      className={clsx(btnFilterClassName, activeClassName)}
      onClick={onClick}
    >{children}</button>
  );
}