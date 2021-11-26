import {DOMElement, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import ButtonCheck from './ButtonCheck';
import { useAppDispatch } from '../redux/hooks';
import { remove, toggleComplete, setSwapCount, commitSwapTodo, Todo, animateTodo } from '../redux/reducers/todoListSlice';
import Draggable from 'react-draggable';
import { current } from 'immer';
import { getDisplayName } from 'next/dist/shared/lib/utils';
import next from 'next';

type Props = {
  children: string;
  id: string;
  completed: boolean;
  index: number;
  swapCount: number;
  translateY: number;
}


export default function List({children, id, completed, index, swapCount, translateY} : Props) {
  const nodeRef = useRef(null);
  const [y, setY] = useState(0);
  const [x, setX] = useState(0);
  const [swapThresholds, setSwapThresholds] = useState([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    nodeRef.current.style.transform = `translate(0px, ${translateY}px)`;
  }, [translateY])

  function handleRemove(id) {
    dispatch(remove(id));
  }
  function handleToggleComplete(id) {
    dispatch(toggleComplete(id));
  }
  // index = 0; thresholds = [null, 32, 150, 268, 332];
  function onStart() {
    nodeRef.current.style.zIndex = '1000';
    const lists = document.querySelectorAll('.todo-list');
    let swapThresholds = [];
    lists.forEach( list => {
      list.classList.add('transition-transform');
      swapThresholds.push()
    });
    swapThresholds = Array.from(lists).map( (list, i) => {
      if ( i === index) {
        return null;
      } else if ( i < index) {
        let value = Array.from(lists).slice(i, index).reduce((prev, li, idx, subLists) => {
          if ( idx === 0) {
            return prev + (li as HTMLElement).offsetHeight / 2;
          } else {
            return prev + (li as HTMLElement).offsetHeight;
          }
        }, 0);
        return -(value);
      } else if ( i > index) {
        const subLists = Array.from(lists).slice(index + 1, i + 1);
        let value = subLists.reduce((prev, li, idx) => {
          if ( idx + 1 === subLists.length) {
            return prev + (li as HTMLElement).offsetHeight / 2;
          } else {
            return prev + (li as HTMLElement).offsetHeight;
          }
        }, 0);
        return value;
      }
    })
    setSwapThresholds( swapThresholds );
  }
  
  function onDrag(e, data) {
    nodeRef.current.classList.add('shadow-lg');
    const lists = document.querySelectorAll('.todo-list');
    const listHeight = nodeRef.current.offsetHeight;
    let direction: 'bottom' | 'top';
    if ( data.y >  data.lastY) {
      direction = 'bottom';
    } else if ( data.y < data.lastY) {
      direction = 'top';
    }
    if (direction === undefined) {
      return;
    }
    
    if ( swapCount === 0) {
      if (direction === 'bottom') {
        const swapIndex = index + 1;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y > swapThreshold) {
          const translateY = -(listHeight);
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      } else if ( direction === 'top') {
        const swapIndex = index - 1;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y < swapThreshold) {
          const translateY = listHeight;
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      }
    } else if ( swapCount < 0) {
      if (direction === 'bottom') {
        const swapIndex = index + swapCount;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y > swapThreshold) {
          const translateY = 0;
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      } else if (direction === 'top') {
        const swapIndex = index + swapCount - 1;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y < swapThreshold) {
          const translateY = listHeight;
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      }

    } else if ( swapCount > 0) {
      if (direction === 'bottom') {
        const swapIndex = index + swapCount + 1;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y > swapThreshold) {
          const translateY = -(listHeight);
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      } else if (direction === 'top') {
        const swapIndex = index + swapCount;
        const swapThreshold = swapThresholds[swapIndex];
        if (data.y < swapThreshold) {
          const translateY = 0;
          const swapId = (lists[swapIndex] as HTMLElement).id.replace('list-', '');
          dispatch(animateTodo({id: swapId, y: translateY}));
          dispatch(setSwapCount({id, direction}));
        }
      }
    }
  }
  
  function onStop(e, data) {
    nodeRef.current.style.zIndex = '';
    const lists = document.querySelectorAll('.todo-list');
    lists.forEach( list => {
      list.classList.remove('transition-transform');
    });
    dispatch(commitSwapTodo(id));
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
      defaultPosition={{ x:0, y:translateY }}
      position={{ x, y }}
      handle=".handle"
      cancel=".no-handle"
    >
      <li 
        className="todo-list group relative flex py-3.5 px-5 sm:py-4 sm:px-6 dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue border-b dark:border-dark-theme-darkest-grayish-blue border-light-theme-very-light-grayish-blue cursor-move handle bg-white dark:bg-dark-theme-very-dark-desaturated-blue rounded-t-md"
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
