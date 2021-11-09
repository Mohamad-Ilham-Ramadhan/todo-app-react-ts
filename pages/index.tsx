import {useState} from 'react';

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
    <div className="bg-light-theme-very-light-gray h-24"> 
     ilham
    </div>
  );
}

