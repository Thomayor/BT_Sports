import * as React from 'react';
import { createContext, useContext } from 'react';
import { twMerge } from 'tailwind-merge';

type InputGroupProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'div'>;

export const inputGroupContext = createContext(false);

function InputGroup({ children, className, ...otherProps }: InputGroupProps) {
  return (
    <inputGroupContext.Provider value>
      <div {...otherProps} className={twMerge(['flex', className])}>
        {children}
      </div>
    </inputGroupContext.Provider>
  );
}

type TextProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'div'>;

const InputGroupText = function InputGroupText({
  children,
  className,
  ...otherProps
}: TextProps) {
  const inputGroup = useContext(inputGroupContext);
  return (
    <div
      {...otherProps}
      className={twMerge([
        'border border-slate-200 bg-slate-100 px-3 py-2 text-slate-600 shadow-sm dark:border-darkmode-900/20 dark:bg-darkmode-900/20 dark:text-slate-400',
        inputGroup &&
          'rounded-none first:rounded-l last:rounded-r [&:not(:first-child)]:border-l-transparent',
        className,
      ])}
    >
      {children}
    </div>
  );
};

InputGroupText.displayName = 'InputGroupText';
InputGroup.Text = InputGroupText;

export default InputGroup;
