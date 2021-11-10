import {useState} from 'react';
import InputBar from '../components/InputBar';
import TodoList from '../components/TodoList';
import SwitchTheme from '../components/SwitchTheme';

export default function Home() {
  const [text, setText] = useState('');
  const [showText, setShowText] = useState(false);
  
  function handleChange(e) {
    setText(e.target.value);
  }
  function handleSetText() {
    setShowText( prev => !prev );
  }
  function handleClear() {
    setText('');
  }
  return (
    <div className="dark:bg-desktop-dark bg-desktop-light bg-no-repeat dark:bg-dark-theme-very-dark-blue bg-white min-h-screen"> 
      <div className="pt-13 w-136 mx-auto">
        <div className="flex text-white mb-10">
          <div className="mr-auto font-bold text-4xl" style={{ letterSpacing: '.75rem' }}>TODO</div>
          <div className="flex items-center">
            <SwitchTheme></SwitchTheme>
          </div>
        </div>

        <InputBar style="mb-6" />
        <TodoList />
      </div>
    </div>
  );
}

