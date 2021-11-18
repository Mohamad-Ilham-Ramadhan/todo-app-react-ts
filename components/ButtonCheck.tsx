import { useState } from 'react';
import clsx from 'clsx';

type Props = {
  onClick: () => void;
  checked: boolean
}

export default function ButtonCheck({onClick, checked} : Props) {
  const border = checked ? 'from-check-from to-check-to' : 'dark:bg-dark-theme-darkest-grayish-blue bg-light-theme-very-light-grayish-blue';
  const bg = checked ? 'bg-gradient-to-br from-check-from to-check-to' : '';

  
  return (
    <div className={clsx("rounded-full p-px flex justify-center items-center bg-gradient-to-br hover:from-check-from hover:to-check-to cursor-pointer relative", border)} onClick={onClick} role="button">
      <input type="checkbox" 
        checked={checked} 
        readOnly
        className={clsx('rounded-full w-4.5 h-4.5 sm:w-6 sm:h-6 text-center flex justify-center items-center focus:outline-none dark:bg-dark-theme-very-dark-desaturated-blue bg-white appearance-none cursor-pointer', bg)}
      />  
      {checked && 
        <img src="/images/icon-check.svg" alt="check icon" className="w-2/4 sm:w-2/4 absolute"/>
      }
    </div>
  );
}