import ButtonCheck from './ButtonCheck';

export default function TodoList() {

  return (
    <ul className="bg-dark-theme-very-dark-desaturated-blue rounded-md">
      <li className="flex py-5 pr-5 text-dark-theme-light-grayish-blue">
        <div className="px-6">
          <ButtonCheck />
        </div>
        <div>
          Learn react typescript TDD 
        </div>
        <button className="flex justify-center items-center ml-auto">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z"/></svg>
        </button>
      </li>
    </ul>
  );
}