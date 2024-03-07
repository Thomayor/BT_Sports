import * as React from 'react';
import { twMerge } from 'tailwind-merge';

export type FormCheckProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'div'>;

function FormCheck(props: FormCheckProps) {
  const { children, className, ...otherProps } = props;
  return (
    <div {...otherProps} className={twMerge(['flex items-center', className])}>
      {children}
    </div>
  );
}

export type LabelProps = React.PropsWithChildren &
  React.ComponentPropsWithoutRef<'label'>;

const FormCheckLabel = function FormCheckLabel(props: LabelProps) {
  const { children, className, ...otherProps } = props;
  return (
    /* eslint-disable jsx-a11y/label-has-associated-control */
    <label
      {...otherProps}
      className={twMerge(['ml-2 cursor-pointer', className])}
    >
      {children}
    </label>
  );
};

FormCheck.Label = FormCheckLabel;

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  type: 'radio' | 'checkbox';
}

const FormCheckInput = function FormCheckInput(props: InputProps) {
  const { className, type, ...otherProps } = props;
  return (
    <input
      {...otherProps}
      className={twMerge([
        // Default
        'transition-all duration-100 ease-in-out',

        // Input type radio
        type === 'radio' &&
          'cursor-pointer border-slate-200 shadow-sm focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-0 dark:border-transparent dark:bg-darkmode-800 dark:focus:ring-slate-700 dark:focus:ring-opacity-50',

        // Input type checkbox
        type === 'checkbox' &&
          'cursor-pointer rounded border-slate-200 shadow-sm focus:ring-4 focus:ring-primary focus:ring-opacity-20 focus:ring-offset-0 dark:border-transparent dark:bg-darkmode-800 dark:focus:ring-slate-700 dark:focus:ring-opacity-50',

        // On checked
        `[&[type='${type}']]:checked:border-primary [&[type='${type}']]:checked:border-opacity-10 [&[type='${type}']]:checked:bg-primary`,

        // On checked and not disabled
        '[&:disabled:not(:checked)]:cursor-not-allowed [&:disabled:not(:checked)]:bg-slate-100 [&:disabled:not(:checked)]:dark:bg-darkmode-800/50',

        // On checked and disabled
        '[&:disabled:checked]:cursor-not-allowed [&:disabled:checked]:opacity-70 [&:disabled:checked]:dark:bg-darkmode-800/50',

        className,
      ])}
    />
  );
};

FormCheck.Input = FormCheckInput;

export default FormCheck;
