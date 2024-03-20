import * as React from 'react';
import { createContext } from 'react';
import { twMerge } from 'tailwind-merge';

type FormInlineProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'div'>;

export const formInlineContext = createContext(false);

function FormInline(props: FormInlineProps) {
  const { children, className, ...otherProps } = props;

  return (
    <formInlineContext.Provider value>
      <div
        {...otherProps}
        className={twMerge(['block items-center sm:flex', className])}
      >
        {children}
      </div>
    </formInlineContext.Provider>
  );
}

export default FormInline;
