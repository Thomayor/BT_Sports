import classNames from 'classnames';
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((props, ref) => (
  <input
    {...props}
    ref={ref}
    className={classNames(
      'border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-sky-500 dark:focus:border-sky-500 focus:ring-sky-500 dark:focus:ring-sky-500 rounded-md shadow-sm',
      props.className,
    )}
  />
));

export default TextInput;
