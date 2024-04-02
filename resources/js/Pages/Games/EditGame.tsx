import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import EditGameForm from "./Partials/EditGameForm";
import { CreateGameProps, UpdateGameProps } from "@/types";
import { t } from "i18next";

export default function EditGame({ game, playgrounds, sports, teams }: UpdateGameProps) {
    return (
        <AppLayout
            title={t('pages.games.descriptionedit')}
        >  
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <EditGameForm playgrounds={playgrounds} sports={sports} teams={teams} game={game} />
                </div>
            </div>
        </AppLayout>
    )
}