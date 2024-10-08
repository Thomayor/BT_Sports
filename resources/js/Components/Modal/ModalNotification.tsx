import React, { useState } from 'react';
import { Link, router } from '@inertiajs/react';
import ModalIcon from './ModalIcon';
import Method, { Notification } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';

interface ModalNotificationProps {
  notifications: Notification[];
}

function ModalNotification({ notifications }: ModalNotificationProps) {
  const title = 'Notifications';
  const color = 'bg-red-500';
  const icon = (
    <div className="text-slate-400">
      <FontAwesomeIcon icon={faBell} className="w-10 h-6" />
    </div>
  );

  const route = useRoute();
  const [showModal, setShowModal] = useState(false);
  const newUnreadNotifications = notifications.filter(
    notification => notification.pivot.read_at === null,
  );
  const notificationCount = newUnreadNotifications.length;

  function handleMarkAllAsRead() {
    router.post(route('notifications.readall'));
  }

  function handleMarkAsRead(id: number) {
    router.post(
      route('notifications.read', {
        id,
      }),
    );
  }

  return (
    <ModalIcon count={notificationCount} color={color} icon={icon}>
      <div className="p-2 flex justify-between items-center text-base font-medium">
        <h5 className="text-sm font-medium">{title}</h5>
        <button
          className="absolute  top-1 right-2 cursor-pointer rounded-full border px-2 hover:border-sky-500"
          onClick={() => setShowModal(!showModal)}
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-15 h-15" />
        </button>
        {showModal && (
          <div className="absolute z-20 top-8 right-0 bg-white shadow-md rounded-md ">
            <button
              className="flex space-x-2 items-center p-6 hover:text-sky-500  rounded-md"
              onClick={handleMarkAllAsRead}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="w-15 h-15 text-sky-500"
              />
              <span>Tout marquer comme lu</span>
            </button>
          </div>
        )}
      </div>

      <div className="p-2 flex h-auto flex-col overflow-y-auto">
        {notifications && notifications.length > 0 ? (
          notifications.map((notification: Notification) => (
            <div key={notification.id} className="relative flex cursor-pointer">
              <div className="mt-3 flex w-full justify-between">
                <div
                  className={`mb-1 mr-2 flex justify-start ${
                    notification.pivot.read_at === null
                      ? 'font-bold text-black dark:text-white'
                      : 'text-slate-500 dark:text-slate-300'
                  }`}
                >
                  <div
                    className="mr-1"
                    onClick={() => {
                      handleMarkAsRead(notification.id);
                      window.location.href = `/${notification.link}`;
                    }}
                  >
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-end">
                  {notification.pivot.read_at === null ? (
                    <Link
                      href={route('notifications.read', {
                        id: notification.id,
                      })}
                      method={Method.POST}
                      className=""
                      as="button"
                    >
                      <div className="border-gray/20 h-3 w-3 rounded-full border bg-primary dark:text-slate-500" />
                    </Link>
                  ) : (
                    <FontAwesomeIcon icon={faCheck} className="w-4 h-4" />
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <p className="text-sm px-4.5 py-3 text-center">
              Pas de notifications
            </p>
          </div>
        )}
      </div>
    </ModalIcon>
  );
}

export default ModalNotification;
