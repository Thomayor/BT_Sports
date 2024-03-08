import React from 'react';
import { Link } from '@inertiajs/react';
import DropdownIcon from './DropdownIcon';
import { Notification } from '@/types';

function DropdownNotification({
  notifications,
}: {
  notifications: Notification[];
}) {
  const title = 'Notifications';
  const color = 'bg-yellow-500';
  const icon = (
    <svg
      width="24"
      height="24"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.3333 19.8333H23.1187C23.2568 19.4597 23.3295 19.065 23.3333 18.6666V12.8333C23.3294 10.7663 22.6402 8.75902 21.3735 7.12565C20.1068 5.49228 18.3343 4.32508 16.3333 3.80679V3.49996C16.3333 2.88112 16.0875 2.28763 15.6499 1.85004C15.2123 1.41246 14.6188 1.16663 14 1.16663C13.3812 1.16663 12.7877 1.41246 12.3501 1.85004C11.9125 2.28763 11.6667 2.88112 11.6667 3.49996V3.80679C9.66574 4.32508 7.89317 5.49228 6.6265 7.12565C5.35983 8.75902 4.67058 10.7663 4.66667 12.8333V18.6666C4.67053 19.065 4.74316 19.4597 4.88133 19.8333H4.66667C4.35725 19.8333 4.0605 19.9562 3.84171 20.175C3.62292 20.3938 3.5 20.6905 3.5 21C3.5 21.3094 3.62292 21.6061 3.84171 21.8249C4.0605 22.0437 4.35725 22.1666 4.66667 22.1666H23.3333C23.6428 22.1666 23.9395 22.0437 24.1583 21.8249C24.3771 21.6061 24.5 21.3094 24.5 21C24.5 20.6905 24.3771 20.3938 24.1583 20.175C23.9395 19.9562 23.6428 19.8333 23.3333 19.8333Z"
        fill="#717579"
      />
      <path
        d="M9.9819 24.5C10.3863 25.2088 10.971 25.7981 11.6766 26.2079C12.3823 26.6178 13.1838 26.8337 13.9999 26.8337C14.816 26.8337 15.6175 26.6178 16.3232 26.2079C17.0288 25.7981 17.6135 25.2088 18.0179 24.5H9.9819Z"
        fill="#717579"
      />
    </svg>
  );

  console.log(notifications,'er');
  
  return (
    <DropdownIcon
      title={title}
      count={notifications?.length}
      color={color}
      icon={icon}
    >
      <ul className="flex h-auto flex-col overflow-y-auto">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification: Notification) => (
            <li key={notification.id}>
              <Link
                className="flex flex-col gap-2.5 border-t border-stroke px-4.5 py-3 hover:bg-gray-2 dark:border-strokedark dark:hover:bg-meta-4"
                href={notification.link}
              >
                <p className="text-sm">
                  <span className="text-black dark:text-white">
                    {notification.content}
                  </span>
                  {notification.date}
                </p>
                <p className="text-xs">{notification.date}</p>
              </Link>
            </li>
          ))
        ) : (
          <li>
            <p className="text-sm px-4.5 py-3 text-center">
              Pas de notifications
            </p>
          </li>
        )}
      </ul>
    </DropdownIcon>
  );
}

export default DropdownNotification;
