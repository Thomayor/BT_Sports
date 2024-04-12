import React from 'react';
import CreateGameForm from './Partials/CreateGameForm';
import AppLayout from '@/Layouts/AppLayout';
import { CreateGameProps } from '@/types';
import { t } from 'i18next';

export default function CreateGame({ playgrounds, sports, teams }: CreateGameProps) {
    return (
        <AppLayout
            title={t('pages.games.create')}
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateGameForm 
                    playgrounds={playgrounds} 
                    sports={sports} 
                    teams={teams} 
                />
            </div>
        </AppLayout>
    )
}