import React from 'react';
import { Link } from '@inertiajs/react';
import { Team } from '@/types';
import AppLayout from '@/Layouts/AppLayout';
import { t } from 'i18next';

interface TeamsIndexProps {
  teams: Team[];
}

export default function Index({ teams }: TeamsIndexProps) {
  return (
    <AppLayout
      title={t('pages.team.teams')}
      renderHeader={() => (
        <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
         {t('pages.team.teams')}
        </h2>
      )}
    >
      <div>
        <h1>Teams</h1>
        <ul>
          {teams.map(team => (
            <li key={team.id}>
              <Link href={`/teams/${team.id}/members`}>{team.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </AppLayout>
  );
}
