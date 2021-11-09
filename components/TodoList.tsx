import ButtonCheck from './ButtonCheck';

import List from './List';

export default function TodoList() {

  return (
    <ul className="bg-dark-theme-very-dark-desaturated-blue rounded-md">
      <List>Learn react typescript and TDD</List>
      <List>Lets go</List>
      <List>Workout boy!</List>
    </ul>
  );
}