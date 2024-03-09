import React, { useEffect, useRef, useState } from 'react';

interface DropdownIconProps {
  count?: number;
  color?: string;
  icon: any;
  children: any;
}

function DropdownIcon({
  count,
  color,
  icon,
  children,
}: DropdownIconProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  return (
    <li className="relative">
      <button
        type="button"
        ref={trigger}
        onClick={() => {
          setNotifying(false);
          setDropdownOpen(!dropdownOpen);
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

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute -right-16 mt-2.5 flex h-90 w-75 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark sm:right-0 sm:w-80 ${
          dropdownOpen === true ? 'block' : 'hidden'
        }`}
      >
       

        {children}
      </div>
      {/* <!-- Dropdown End --> */}
    </li>
  );
}

export default DropdownIcon;
