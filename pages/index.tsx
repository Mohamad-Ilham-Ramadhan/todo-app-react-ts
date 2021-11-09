import {useState} from 'react';
import InputBar from '../components/InputBar';
import TodoList from '../components/TodoList';

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
    <div className="bg-desktop-dark bg-no-repeat bg-dark-theme-very-dark-blue min-h-screen"> 
      <div className="pt-13 w-136 mx-auto">
        <div className="flex text-white mb-10">
          <div className="mr-auto font-bold text-4xl" style={{ letterSpacing: '.75rem' }}>TODO</div>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26"><path fill="#FFF" fillRule="evenodd" d="M13 21a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm-5.657-2.343a1 1 0 010 1.414l-2.121 2.121a1 1 0 01-1.414-1.414l2.12-2.121a1 1 0 011.415 0zm12.728 0l2.121 2.121a1 1 0 01-1.414 1.414l-2.121-2.12a1 1 0 011.414-1.415zM13 8a5 5 0 110 10 5 5 0 010-10zm12 4a1 1 0 110 2h-3a1 1 0 110-2h3zM4 12a1 1 0 110 2H1a1 1 0 110-2h3zm18.192-8.192a1 1 0 010 1.414l-2.12 2.121a1 1 0 01-1.415-1.414l2.121-2.121a1 1 0 011.414 0zm-16.97 0l2.121 2.12A1 1 0 015.93 7.344L3.808 5.222a1 1 0 011.414-1.414zM13 0a1 1 0 011 1v3a1 1 0 11-2 0V1a1 1 0 011-1z"/></svg>
          </div>
        </div>

        <InputBar style="mb-6" />
        <TodoList />
      </div>
    </div>
  );
}

