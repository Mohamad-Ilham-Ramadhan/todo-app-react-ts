import { useState } from 'react';
import clsx from 'clsx';

export default function ButtonCheck() {
  const [checked, setChecked] = useState(false);
  const bg = checked ? 'bg-gradient-to-br from-check-from to-check-to' : 'border-1';

  function handleClick() {
    setChecked( prev => !prev );
  }
  return (
    <button 
      className={clsx('rounded-full w-6 h-6 text-center flex justify-center items-center focus:outline-none', bg)}
      onClick={handleClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
    </button>  
  );
}