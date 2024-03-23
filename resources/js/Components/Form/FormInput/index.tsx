import React, { useContext, forwardRef, useRef, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { formInlineContext } from '../FormInline';
import { inputGroupContext } from '../InputGroup';

interface FormInputProps extends React.ComponentPropsWithoutRef<'input'> {
  formInputSize?: 'sm' | 'lg';
  rounded?: boolean;
  isFocused?: boolean;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const formInline = useContext(formInlineContext);
  const inputGroup = useContext(inputGroupContext);
  const { formInputSize, rounded, isFocused, className, ...computedProps } =
    props;
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFocused && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFocused]);

  return (
    <input
      {...computedProps}
      ref={(inputRef as React.RefObject<HTMLInputElement>) || ref}
      className={twMerge([
        'disabled:cursor-not-allowed disabled:bg-slate-100 dark:disabled:border-transparent dark:disabled:bg-darkmode-800/50',
        '[&[readonly]]:cursor-not-allowed [&[readonly]]:bg-slate-100 [&[readonly]]:dark:border-transparent [&[readonly]]:dark:bg-darkmode-800/50',
        'w-full rounded-md border-slate-200 text-sm shadow-sm transition duration-200 ease-in-out placeholder:text-slate-400/90 focus:border-primary focus:border-opacity-40 focus:ring-4 focus:ring-primary focus:ring-opacity-20 dark:border-transparent dark:bg-darkmode-800 dark:placeholder:text-slate-500/80 dark:focus:ring-slate-700 dark:focus:ring-opacity-50',
        formInputSize === 'sm' && 'px-2 py-1.5 text-xs',
        formInputSize === 'lg' && 'px-4 py-1.5 text-lg',
        rounded && 'rounded-full',
        formInline && 'flex-1',
        inputGroup &&
          'z-10 rounded-none first:rounded-l last:rounded-r [&:not(:first-child)]:border-l-transparent',
        className,
      ])}
    />
  );
});

FormInput.displayName = 'FormInput';
FormInput.defaultProps = {
  formInputSize: 'sm',
  rounded: false,
  isFocused: false,
};

export default FormInput;
