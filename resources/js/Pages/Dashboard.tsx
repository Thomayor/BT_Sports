import React from 'react';
import Welcome from '@/Components/Welcome';
import AppLayout from '@/Layouts/AppLayout';
import { DashboardProps } from '@/types';
import { t } from 'i18next';

export default function Dashboard({countGame, countTeam, countUser}: DashboardProps) {
  return (
    <AppLayout
      title={t('nav.dashboard')}
    >
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-xl sm:rounded-lg">
            <Welcome countGame={countGame} countTeam={countTeam} countUser={countUser} />
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
