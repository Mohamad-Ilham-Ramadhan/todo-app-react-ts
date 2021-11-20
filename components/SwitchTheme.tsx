import {useState} from 'react';
// import styles from '../styles/switch-theme.module.css';
// import clsx from 'clsx';

type Theme = 'dark' | 'light';

export default function SwitchTheme() {
  const [theme, setTheme] = useState<Theme>('light');

  function handleClick() {
    setTheme( prev => { 
      const newState = prev === 'dark' ? 'light' : 'dark';

      if (newState === 'dark') {
        document.body.classList.add(newState);
      } else {
        document.body.classList.remove('dark');
      }

      return newState;
    });
  }
  return (
    <div role="button" onClick={handleClick} className="relative switch-theme-size-mobile sm:switch-theme-size" data-testid="btn-switch-theme">
      <input type="checkbox" className="appearance-none absolute" defaultChecked/>
      {theme === 'dark' ? 
        <img src="/images/icon-sun.svg" alt=""/>
        :
        <img src="/images/icon-moon.svg" alt=""/>
      }
    </div>
  );
}