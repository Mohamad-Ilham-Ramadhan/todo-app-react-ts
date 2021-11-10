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
    <div className={clsx("rounded-full p-px flex justify-center items-center bg-gradient-to-br hover:from-check-from hover:to-check-to cursor-pointer", border)} onClick={onClick} role="button">
      <input type="checkbox" 
        checked={checked} 
        readOnly
        className={clsx('rounded-full w-6 h-6 text-center flex justify-center items-center focus:outline-none dark:bg-dark-theme-very-dark-desaturated-blue bg-white appearance-none cursor-pointer', bg)}
      />  
      {checked && 
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" className="absolute cursor-pointer"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
        }
    </div>
  );
}