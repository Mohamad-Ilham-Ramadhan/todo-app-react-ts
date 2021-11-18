import clsx from 'clsx';
import { ReactComponentElement } from 'react';
import { useAppSelector, useAppDispatch } from '../redux/hooks';
import {  setFilter, Filter } from '../redux/reducers/todoListSlice';
// Components
import ButtonFilter from './ButtonFilter';


type Props = {
  className?: string;
}
export default function FiltersBar({className} : Props) {
  const dispatch = useAppDispatch();
  const filter = useAppSelector( state => state.filter );

  function handleFilter(filter: Filter) {
    dispatch(setFilter(filter));
  }
  return (
    <div className={clsx("flex justify-center py-3.5 px-5 sm:py-5 sm:px-6 w-full rounded-md text-sm dark:bg-dark-theme-very-dark-desaturated-blue bg-white focus:outline-none dark:text-dark-theme-light-grayish-blue text-light-theme-very-dark-grayish-blue shadow-2xl", className)}>
      <ButtonFilter active={filter === 'all' ? true : false} onClick={() => handleFilter('all')}>All</ButtonFilter>
      <ButtonFilter active={filter === 'active' ? true : false} onClick={() => handleFilter('active')}>Active</ButtonFilter>
      <ButtonFilter active={filter === 'completed' ? true : false} onClick={() => handleFilter('completed')}>Completed</ButtonFilter>
    </div>
  );
}