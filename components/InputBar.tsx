import ButtonCheck from "./ButtonCheck";
import clsx from 'clsx';
import {Todo, add} from '../redux/reducers/todoListSlice';
import {RootState} from '../redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  style?: string;
}

export default function InputBar({style} : Props) {
  const todos = useSelector((state: RootState) => state.todoList.todos);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  console.log(todos);
  function handleSubmit(e) {
    e.preventDefault();
    const todo: Todo = {
      id: uuidv4(),
      title: value,
      completed: false,
    }
    dispatch(add(todo));
    setValue('');
  }
  return (
    <div className={clsx("flex py-5 pr-5 w-full rounded-md dark:bg-dark-theme-very-dark-desaturated-blue bg-white focus:outline-none dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue drop-shadow-2xl", style)}>
      <div className="px-6">
        <ButtonCheck />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="bg-transparent focus:outline-none caret-primary-bright-blue w-full"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}
