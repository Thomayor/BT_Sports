import React from 'react';
import CreatePlaygroundForm from './Partials/CreatePlaygroundForm';
import AppLayout from '@/Layouts/AppLayout';


export default function Create() {
    return (
        <AppLayout
            title="Create Playground"
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreatePlaygroundForm />
            </div>
        </AppLayout>
    )
}