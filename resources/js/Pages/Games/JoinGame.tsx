import AppLayout from '@/Layouts/AppLayout';
import React from 'react';
import JoinGameForm from './Partials/JoinGameForm';
import { JoinGameProps } from '@/types';
import { t } from 'i18next';

export default function JoinGame({ game, teams }: JoinGameProps) {
  return (
    <AppLayout title={t('pages.games.join')}>
      <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
        <JoinGameForm game={game} teams={teams} />
      </div>
    </AppLayout>
  );
}
