import { useState } from 'react';
import clsx from 'clsx';

export default function ButtonCheck() {
  const [checked, setChecked] = useState(false);
  const border = checked ? 'from-check-from to-check-to' : 'bg-dark-theme-darkest-grayish-blue';
  const bg = checked ? 'bg-gradient-to-br from-check-from to-check-to' : '';

  function handleClick() {
    setChecked( prev => !prev );
  }
  return (
    <div className={clsx("rounded-full p-px flex justify-center items-center bg-gradient-to-br hover:from-check-from hover:to-check-to", border)} onClick={handleClick}>
      <input type="checkbox" 
        checked={checked} 
        className={clsx('rounded-full w-6 h-6 text-center flex justify-center items-center focus:outline-none bg-dark-theme-very-dark-desaturated-blue appearance-none', bg)}
      />  
      {checked && 
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9" style={{position: 'absolute'}}><path fill="none" stroke="#FFF" strokeWidth="2" d="M1 4.304L3.696 7l6-6"/></svg>
        }
    </div>
  );
}