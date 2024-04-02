import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { DashboardProps } from '@/types';
import { t } from 'i18next';

export default function Welcome({
  countGame,
  countTeam,
  countUser,
}: DashboardProps) {
  return (
    <div>
      <div className="p-6 lg:p-8 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <ApplicationLogo className="block h-12 w-auto" />

        <h1 className="mt-8 text-2xl font-medium text-gray-900 dark:text-white">
        {t('pages.dashboard.welcome')}
        </h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 p-6 lg:p-8">
        <div className="bg-sky-100 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('pages.dashboard.totalgames')}
            </h2>
            <p className="text-2xl text-gray-800 dark:text-gray-200">
              {countGame}
            </p>
          </div>
        </div>

        <div className="bg-sky-200 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('pages.dashboard.totalteams')}
            </h2>
            <p className="text-2xl text-gray-800 dark:text-gray-200">
              {countTeam}
            </p>
          </div>
        </div>

        <div className="bg-sky-300 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            {t('pages.dashboard.totalusers')}
            </h2>
            <p className="text-2xl text-gray-800 dark:text-gray-200">
              {countUser}
            </p>
          </div>
        </div>
      </div>

      <div className="p-3 lg:p-6 bg-white dark:bg-gray-800 dark:bg-gradient-to-bl dark:from-gray-700/50 dark:via-transparent border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-medium text-gray-900 dark:text-white border-gray-200  border-b ">
        {t('pages.dashboard.news')}
        </h2>

        <p className="mt-6 text-gray-500 dark:text-gray-400 leading-relaxed">
        {t('pages.dashboard.infos')}
        </p>
      </div>
    </div>
  );
}
