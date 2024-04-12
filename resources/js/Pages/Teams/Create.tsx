import CreateTeamForm from '@/Pages/Teams/Partials/CreateTeamForm';
import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import { t } from 'i18next';

export default function Create() {
  return (
    <AppLayout
      title={t('pages.team.createTeam')}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
          {t('pages.team.createTeam')}
        </h2>
      )}
    >
      <div>
        <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
          <CreateTeamForm />
        </div>
      </div>
    </AppLayout>
  );
}
