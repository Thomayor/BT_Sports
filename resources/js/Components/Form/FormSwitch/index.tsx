import * as React from 'react';
import { twMerge } from 'tailwind-merge';
import FormCheck, { FormCheckProps, LabelProps } from '../FormCheck';

function FormSwitch(props: FormCheckProps) {
  const { children, ...otherProps } = props;
  return <FormCheck {...otherProps}>{children}</FormCheck>;
}

const FormSwitchLabel = function FormSwitchLabel(props: LabelProps) {
  const { children, ...otherProps } = props;
  return <FormCheck.Label {...otherProps}>{children}</FormCheck.Label>;
};

FormSwitch.Label = FormSwitchLabel;

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  type: 'checkbox';
}

function FormSwitchInput(props: InputProps) {
  const { className, ...otherProps } = props;
  return (
    <FormCheck.Input
      {...otherProps}
      className={twMerge([
        // Default
        'relative h-[24px] w-[38px] rounded-full p-px',
        'before:absolute before:inset-y-0 before:my-auto before:h-[20px] before:w-[20px] before:rounded-full before:shadow-[1px_1px_3px_rgba(0,0,0,0.25)] before:transition-[margin-left] before:duration-200 before:ease-in-out before:dark:bg-darkmode-600',

        // On checked
        'checked:border-primary checked:bg-primary checked:bg-none',
        'before:checked:ml-[14px] before:checked:bg-white',

        className,
      ])}
    />
  );
}

FormSwitch.Input = FormSwitchInput;

export default FormSwitch;
