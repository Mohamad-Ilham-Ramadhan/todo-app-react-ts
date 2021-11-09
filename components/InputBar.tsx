import ButtonCheck from "./ButtonCheck";
import clsx from 'clsx';

type Props = {
  style?: string;
}

export default function InputBar({style} : Props) {
  return (
    <div className={clsx("flex py-5 pr-5 bg-dark-theme-very-dark-desaturated-blue w-full rounded-md focus:outline-none text-dark-theme-light-grayish-blue drop-shadow-2xl", style)}>
      <div className="px-6">
        <ButtonCheck />
      </div>
      <input
        type="text"
        className="bg-transparent focus:outline-none caret-primary-bright-blue w-full"
      />
    </div>
  );
}
