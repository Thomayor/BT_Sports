import React from 'react';
import { Link } from '@inertiajs/react';
import DropdownIcon from './DropdownIcon';

function DropdownMessage() {
  // close on click outside
  const title = 'Messages';
  const count = 76;
  const color = 'bg-red-600';
  const icon = (
    <svg
      width="20"
      height="20"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M27.076 6.24662C26.962 5.48439 26.5787 4.78822 25.9955 4.28434C25.4123 3.78045 24.6679 3.50219 23.8971 3.5H4.10289C3.33217 3.50219 2.58775 3.78045 2.00456 4.28434C1.42137 4.78822 1.03803 5.48439 0.924011 6.24662L14 14.7079L27.076 6.24662Z"
        fill="#717579"
      />
      <path
        d="M14.4751 16.485C14.3336 16.5765 14.1686 16.6252 14 16.6252C13.8314 16.6252 13.6664 16.5765 13.5249 16.485L0.875 8.30025V21.2721C0.875926 22.1279 1.2163 22.9484 1.82145 23.5536C2.42659 24.1587 3.24707 24.4991 4.10288 24.5H23.8971C24.7529 24.4991 25.5734 24.1587 26.1786 23.5536C26.7837 22.9484 27.1241 22.1279 27.125 21.2721V8.29938L14.4751 16.485Z"
        fill="#717579"
      />
    </svg>
  );

  return (
    <DropdownIcon title={title} count={count} color={color} icon={icon}>
      <ul className="flex h-auto flex-col overflow-y-auto">
        <li>
          <Link
            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            href="/messages"
          >
            <div className="h-12.5 w-12.5 rounded-full">
              <img src="" alt="User" />
            </div>

            <div>
              <h6 className="text-sm font-medium text-black dark:text-white">
                Mariya Desoja
              </h6>
              <p className="text-sm">I like your confidence 💪</p>
              <p className="text-xs">2min ago</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            href="/messages"
          >
            <div className="h-12.5 w-12.5 rounded-full">
              <img src="" alt="User" />
            </div>

            <div>
              <h6 className="text-sm font-medium text-black dark:text-white">
                Robert Jhon
              </h6>
              <p className="text-sm">Can you share your offer?</p>
              <p className="text-xs">10min ago</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            href="/messages"
          >
            <div className="h-12.5 w-12.5 rounded-full">
              <img src="" alt="User" />
            </div>

            <div>
              <h6 className="text-sm font-medium text-black dark:text-white">
                Henry Dholi
              </h6>
              <p className="text-sm">I cam across your profile and...</p>
              <p className="text-xs">1day ago</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            href="/messages"
          >
            <div className="h-12.5 w-12.5 rounded-full">
              <img src="" alt="User" />
            </div>

            <div>
              <h6 className="text-sm font-medium text-black dark:text-white">
                Cody Fisher
              </h6>
              <p className="text-sm">I’m waiting for you response!</p>
              <p className="text-xs">5days ago</p>
            </div>
          </Link>
        </li>
        <li>
          <Link
            className="flex gap-4.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
            href="/messages"
          >
            <div className="h-12.5 w-12.5 rounded-full">
              <img src="" alt="User" />
            </div>

            <div>
              <h6 className="text-sm font-medium text-black dark:text-white">
                Mariya Desoja
              </h6>
              <p className="text-sm">I like your confidence 💪</p>
              <p className="text-xs">2min ago</p>
            </div>
          </Link>
        </li>
      </ul>
    </DropdownIcon>
  );
}

export default DropdownMessage;
