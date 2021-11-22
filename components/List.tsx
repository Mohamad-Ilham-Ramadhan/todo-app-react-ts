import {DOMElement, useRef, useState, useEffect } from 'react';
import clsx from 'clsx';
import ButtonCheck from './ButtonCheck';
import { useAppDispatch } from '../redux/hooks';
import { remove, toggleComplete, setSwapCount, commitSwapTodo, Todo, animateTodo } from '../redux/reducers/todoListSlice';
import Draggable from 'react-draggable';
import { current } from 'immer';
import { getDisplayName } from 'next/dist/shared/lib/utils';

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
  const [height, setHeight] = useState(0);
  const dispatch = useAppDispatch();

  useEffect(() => {;
    setHeight(nodeRef.current.offsetHeight);
  }, [])
  useEffect(() => {
    console.log('translateY update here:', children, translateY);
    nodeRef.current.style.transform = `translate(0px, ${translateY}px)`;
  }, [translateY])

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
  console.log('swapCount:', swapCount);
  function onDrag(e, data) {
    const lists = document.querySelectorAll('.todo-list');
    const halfHeight =  height / 2;
    let direction: 'bottom' | 'top' ;
    console.log(data.lastY, data.y);
    if ( data.y >  data.lastY) {
      direction = 'bottom';
    } else if ( data.y < data.lastY) {
      direction = 'top';
    }
    // [-409.5, -346.5, -283.5, -220.5, -157.5, -94.5, -31.5, || 31.5, 94.5, 157.5, 220.5, 283.5, 346.5, 409.5]
    // const swapThreshold = Math.abs(swapCount) * height + halfHeight;
    let swapThreshold: number;
    if (swapCount === 0) {
      if ( direction === 'bottom' ) {
        swapThreshold = swapCount * height + halfHeight;
      } else if (direction === 'top') {
        swapThreshold = swapCount * height - halfHeight;
      }
    } else if (swapCount > 0) {
      if ( direction === 'bottom' ) {
        swapThreshold = swapCount * height + halfHeight;
      } else if (direction === 'top') {
        swapThreshold = (swapCount - 1) * height + halfHeight;
      }
    } else if (swapCount < 0) {
      if ( direction === 'top' ) {
        swapThreshold = swapCount * height - halfHeight;
      } else if (direction === 'bottom') {
        swapThreshold = (swapCount + 1) * height - halfHeight;
      }
    }
    console.log(direction, 'swapThreshold:', swapThreshold, 'data.y:', data.y);
    if ( direction !== undefined ) {
      // swap list (transform) dan add swap count
      if (direction === 'bottom' && data.y > swapThreshold) {
        if (swapCount < 0) {
          const swapListIndex = swapCount;
          const swapList = lists[swapListIndex] as HTMLElement;
          // swapList.style.transform = `translate(0px, 0px)`;
          dispatch(animateTodo({index: swapListIndex, y: 0}));
          dispatch(setSwapCount({id, direction}));
        } else {
          const swapListIndex = index + swapCount + 1;
          const swapList = lists[swapListIndex] as HTMLElement;
          // swapList.style.transform = `translate(0px, ${-height}px)`;
          dispatch(animateTodo({index: swapListIndex, y: -height}));
          dispatch(setSwapCount({id, direction}));
        }
      } else if (direction === 'top' && data.y < swapThreshold) {
        if (swapCount > 0) {
          const swapListIndex = swapCount;
          const swapList = lists[swapListIndex] as HTMLElement;
          // swapList.style.transform = `translate(0px, 0px)`;
          dispatch(animateTodo({index: swapListIndex, y: 0}));
          dispatch(setSwapCount({id, direction}));
        } else {
          const swapListIndex = index + swapCount - 1;
          const swapList = lists[swapListIndex] as HTMLElement;
          // swapList.style.transform = `translate(0px, ${height}px)`;
          dispatch(animateTodo({index: swapListIndex, y: height}));
          dispatch(setSwapCount({id, direction}));
        }
      }
    }
  }
  function onStop(e, data) {
    nodeRef.current.style.zIndex = '';
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
        className="todo-list group relative flex py-3.5 px-5 sm:py-4 sm:px-6 rounded-md dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue border-b last:border-b-0 dark:border-dark-theme-darkest-grayish-blue border-light-theme-very-light-grayish-blue bg-inherit cursor-move handle"
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
