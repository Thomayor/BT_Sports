import React, { useState, useEffect, useRef } from 'react';
import { Link, router } from '@inertiajs/react';
import Method, { Notification } from '@/types';
import useRoute from '@/Hooks/useRoute';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEllipsis } from '@fortawesome/free-solid-svg-icons';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';

interface DropdownNotificationProps {
  notifications: Notification[];
}

export default function View({ notifications }: DropdownNotificationProps) {
  const route = useRoute();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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
    <AppLayout title={t('pages.notifications.notif')}>
      <div className="p-2 flex justify-between items-center text-base font-medium">
        <h1 className="text-sm font-medium">{t('pages.notifications.notif')}</h1>
        <button
          className="cursor-pointer rounded-full border px-2 hover:border-sky-500"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FontAwesomeIcon icon={faEllipsis} className="w-15 h-15" />
        </button>
        {showDropdown && (
          <div ref={dropdownRef} className="absolute z-20 top-8 right-0 bg-white shadow-md rounded-md">
            <button
              className="flex space-x-2 items-center p-6 hover:text-sky-500  rounded-md"
              onClick={handleMarkAllAsRead}
            >
              <FontAwesomeIcon
                icon={faCheck}
                className="w-15 h-15 text-sky-500"
              />
              <span>{t('pages.notifications.allread')}</span>
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
                  <a
                    href={`/${notification.link}`}
                    className="mr-1"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    <p className="text-sm">{notification.content}</p>
                    <p className="text-xs">
                      {new Date(notification.created_at).toLocaleString()}
                    </p>
                  </a>
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
            {t('pages.notifications.notif')}
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
