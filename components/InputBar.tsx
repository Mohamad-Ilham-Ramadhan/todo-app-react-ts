import ButtonCheck from "./ButtonCheck";
import clsx from 'clsx';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {  add, input, toggleCheckInput } from '../redux/reducers/todoListSlice';

type Props = {
  style?: string;
}

export default function InputBar({style} : Props) {
  const text = useAppSelector((state) => state.inputBar.text);
  const checked = useAppSelector((state) => state.inputBar.checked);
  const dispatch = useAppDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(add());
  }
  
  return (
    <form 
      role="my-form"
      className={clsx("flex py-3.5 pr-3.5 sm:py-5 sm:pr-5 w-full rounded-md dark:bg-dark-theme-very-dark-desaturated-blue bg-white focus:outline-none dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue drop-shadow-2xl", style)}
      onSubmit={handleSubmit}
    >
      <div className="pl-4 pr-3 sm:px-6">
        <ButtonCheck onClick={() => { dispatch(toggleCheckInput())}} checked={checked} />
      </div>
        <input
          type="text"
          className="bg-transparent focus:outline-none placeholder-light-theme-dark-grayish-blue dark:placeholder-dark-theme-very-light-grayish-blue caret-primary-bright-blue w-full"
          value={text}
          onChange={(e) => dispatch(input(e.target.value))}
          placeholder="Create a new todo..."
        />
    </form>
  );
}
