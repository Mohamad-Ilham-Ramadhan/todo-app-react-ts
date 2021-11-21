import {DOMElement, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import ButtonCheck from './ButtonCheck';
import { useAppDispatch } from '../redux/hooks';
import { remove, toggleComplete,  Todo } from '../redux/reducers/todoListSlice';
import Draggable from 'react-draggable';
import { current } from 'immer';
import { getDisplayName } from 'next/dist/shared/lib/utils';

type Props = {
  children: string;
  id: string;
  completed: boolean;
  index: number;
}


export default function List({children, id, completed, index} : Props) {
  const nodeRef = useRef(null);
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const [height, setHeight] = useState(0);
  const [dragDirection, setDragDirection] = useState(null);
  const dispatch = useAppDispatch();

  useEffect(() => {;
    setHeight(nodeRef.current.offsetHeight);
  }, [])

  function handleRemove(id) {
    dispatch(remove(id));
  }
  function handleToggleComplete(id) {
    dispatch(toggleComplete(id));
  }

  function onStart() {
    // console.log(clientY);
    nodeRef.current.style.zIndex = '1000';
    // nodeRef.current.style.transform = 'scale(1.2)';
    // // const jarakKeLayarAtas = nodeRef.current.
    // const y = nodeRef.current.getBoundingClientRect().y;
    // setClientY(y);
    // console.log('on start Y:', y);
  }
  function onDrag(e, data) {
    const halfHeight =  height / 2;
    let direction;
    if ( data.y >  data.lastY) {
      direction = 'bottom';
    } else if ( data.y < data.lastY) {
      direction = 'top';
    }
    console.log(halfHeight, data.y);
  }
  function onStop(e, data) {
    nodeRef.current.style.zIndex = '';
    // const dropLi = document.elementFromPoint(e.clientX, e.clientY).closest('.handle') as HTMLElement;
    // const text = dropLi.textContent;
    // const toSwapId = dropLi.id.replace('list-', '');
    // console.log(text, toSwapId);
    // dispatch(swapTodo({activeId: id, toSwapId}));
  }

  const lineThrough = completed ? 'line-through text-light-theme-light-grayish-blue dark:text-dark-theme-very-dark-grayish-blue' : '';
  return (
    <Draggable 
      axis="y" 
      bounds="parent" 
      onStart={onStart} 
      onDrag={onDrag} 
      onStop={onStop}
      nodeRef={nodeRef}
      position={{ x, y }}
      handle=".handle"
      cancel=".no-handle"
    >
      <li 
        className="group relative flex py-3.5 px-5 sm:py-4 sm:px-6 rounded-md dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue border-b last:border-b-0 dark:border-dark-theme-darkest-grayish-blue border-light-theme-very-light-grayish-blue bg-inherit cursor-move handle"
        ref={nodeRef}
        id={`list-${id}`}
      >
        <div className="mr-3 sm:mr-5 no-handle flex items-center">
          <ButtonCheck onClick={() => handleToggleComplete(id)} checked={completed}/>
        </div>
        <div className={clsx(lineThrough, 'w-full')}>{children}</div>
        <button className="flex sm:hidden sm:group-hover:flex justify-end items-center ml-auto focus:outline-none no-handle" onClick={() => handleRemove(id)} role="deletion">
          <img src="/images/icon-cross.svg" alt="delete" className="w-4/6 sm:w-full"/>
        </button>
      </li>
    </Draggable>
  );
}
