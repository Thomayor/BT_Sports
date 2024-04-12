import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import CreateSportForm from "./Partials/CreateSportForm";
import { t } from "i18next";

export default function CreateSport() {
    return (
        <AppLayout 
            title={t('pages.sports.create')}
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateSportForm />
            </div>
        </AppLayout>
    )
}