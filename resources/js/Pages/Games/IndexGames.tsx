import { ShowGamesProps } from "@/types";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import IndexGameTable from "./Partials/IndexGameTable";
import { t } from "i18next";

export default function IndexGames({ games, sports, playgrounds, teams }: ShowGamesProps) {
    return (
        <AppLayout title={t('pages.games.matches')} >
            <IndexGameTable 
                games={games} 
                sports={sports} 
                playgrounds={playgrounds} 
                teams={teams} 
            />
        </AppLayout>
    )
}