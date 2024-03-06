import React from 'react';
import { Link } from '@inertiajs/react';
import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import DropdownIcon from './DropdownIcon';

function DropdownReservation() {
  // close on click outside
  const title = 'Messages';
  const icon = <CalendarDaysIcon className="h-6 w-6" />;

  return (
    <DropdownIcon title={title} icon={icon}>
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

export default DropdownReservation;
