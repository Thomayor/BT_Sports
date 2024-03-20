import * as React from 'react';
import { useContext } from 'react';
import { twMerge } from 'tailwind-merge';
import { formInlineContext } from '../FormInline';

type FormLabelProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'label'>;

function FormLabel(props: FormLabelProps) {
  const { children, className, ...otherProps } = props;
  const formInline = useContext(formInlineContext);

  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <label
      {...otherProps}
      className={twMerge([
        'mb-2 inline-block',
        formInline && 'mb-2 sm:mb-0 sm:mr-5 sm:text-right',
        className,
      ])}
    >
      {children}
    </label>
  );
}

export default FormLabel;
