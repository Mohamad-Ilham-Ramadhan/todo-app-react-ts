import ButtonCheck from "./ButtonCheck";
import clsx from 'clsx';
import {Todo, add} from '../redux/reducers/todoListSlice';
import {RootState} from '../redux/store';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import { v4 as uuidv4 } from 'uuid';
import { input, toggleCheckInput } from '../redux/reducers/todoListSlice';

type Props = {
  style?: string;
}

export default function InputBar({style} : Props) {
  const text = useAppSelector((state: RootState) => state.inputBar.text);
  const checked = useAppSelector((state: RootState) => state.inputBar.checked);
  const dispatch = useAppDispatch();
  
  return (
    <div className={clsx("flex py-5 pr-5 w-full rounded-md dark:bg-dark-theme-very-dark-desaturated-blue bg-white focus:outline-none dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue drop-shadow-2xl", style)}>
      <div className="px-6">
        <ButtonCheck onClick={() => { dispatch(toggleCheckInput())}} checked={checked} />
      </div>
      <form  className="w-full">
        <input
          type="text"
          className="bg-transparent focus:outline-none caret-primary-bright-blue w-full"
          value={text}
          onChange={(e) => dispatch(input(e.target.value))}
        />
      </form>
    </div>
  );
}
