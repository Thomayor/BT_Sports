import React from 'react';
import CreateGameForm from './Partials/CreateGameForm';
import AppLayout from '@/Layouts/AppLayout';
import { CreateGameProps } from '@/types';

export default function CreateGame({ playgrounds, sports }: CreateGameProps) {
    return (
        <AppLayout
            title="Create Team"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Create Game
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <CreateGameForm playgrounds={playgrounds} sports={sports}/>
                </div>
            </div>
        </AppLayout>
    )
}