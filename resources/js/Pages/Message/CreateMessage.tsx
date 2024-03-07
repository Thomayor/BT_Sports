import React, { useState } from 'react';
import { FormTextarea } from '@/Components/Form';

function CreateMessage(props: {
  submitMessage: (m: string | undefined) => void;
}) {
  const { submitMessage } = props;
  const [messageState, setMessage] = useState('');

  const onHandleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleEnterKeyPress = () => {
    submitMessage(messageState);
    setMessage('');
  };

  const onHandleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleEnterKeyPress();
    }
  };

  const handleSubmitMessage = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    submitMessage(messageState);
    setMessage('');
  };

  const sendSvg = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-send"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );

  return (
    <div className="flex items-center border-t border-slate-200/60  dark:border-darkmode-400 sm:py-4">
      {/* eslint-disable jsx-a11y/label-has-associated-control */}
      <FormTextarea
        id="messageInput"
        className="py-5 resize-none border-transparent px-5 shadow-none focus:border-transparent focus:ring-0 dark:bg-darkmode-600"
        rows={1}
        value={messageState}
        onChange={onHandleChange}
        onKeyPress={onHandleKeyPress}
        placeholder="Ecrire message..."
      />
      <button
        id="button"
        aria-label="Envoyer le message"
        type="submit"
        className="m-4 p-2 flex  items-center justify-center rounded-full bg-blue-500 text-white "
        onClick={handleSubmitMessage}
      >
        <span className="w-full">{sendSvg}</span>
      </button>
    </div>
  );
}

export default CreateMessage;
