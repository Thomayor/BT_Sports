import React from 'react';
import CreateGameForm from './Partials/CreateGameForm';
import AppLayout from '@/Layouts/AppLayout';
import { CreateGameProps } from '@/types';

export default function Create({ playgrounds, sports, teams }: CreateGameProps) {
    return (
        <AppLayout
            title="Create Team"
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateGameForm playgrounds={playgrounds} sports={sports} teams={teams} />
            </div>
        </AppLayout>
    )
}