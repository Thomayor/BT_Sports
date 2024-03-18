import React, { useEffect, useRef, useState } from 'react';

interface ModalIconProps {
  count?: number;
  color?: string;
  icon: any;
  children: any;
}

function ModalIcon({ count, color, icon, children }: ModalIconProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const modal = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!modal.current) return;
      if (
        !modalOpen ||
        modal.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setModalOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [trigger, modal, modalOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <div className="relative">
      <button
        type="button"
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setModalOpen(!modalOpen);
        }}
        className="relative flex h-12 w-12 items-center justify-center rounded-full border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      >
        {count && count > 0 && (
          <span
            className={`absolute -top-0.5 right-3 z-1 h-2 w-2 rounded-full bg-meta-1 ${
              notifying === false ? 'hidden' : 'inline'
            }`}
          >
            <span
              className={`inline-block px-2 py-1  text-center font-semibold text-xs align-baseline leading-none rounded light text-white ${color} rounded-full`}
            >
              {count}
            </span>
          </span>
        )}
        {icon}
      </button>

      {/* <!-- Start --> */}
      <div
        ref={modal}
        onFocus={() => setModalOpen(true)}
        // onBlur={() => setModalOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-lg  border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          modalOpen === true ? 'sm:block hidden' : 'hidden'
        }`}
      >
        {children}
      </div>
      {/* <!--  End --> */}
    </div>
  );
}

export default ModalIcon;
