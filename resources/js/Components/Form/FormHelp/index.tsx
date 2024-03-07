import * as React from 'react';
import { twMerge } from 'tailwind-merge';

type FormHelpProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'div'>;

function FormHelp(props: FormHelpProps) {
  const { children, className, ...otherProps } = props;

  return (
    <div
      {...otherProps}
      className={twMerge(['mt-2 text-xs text-slate-500', className])}
    >
      {children}
    </div>
  );
}

export default FormHelp;
