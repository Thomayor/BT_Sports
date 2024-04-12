import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { ShowGameListProps } from "@/types";
import ShowGameLists from "./Partials/ShowGameLists";
import { t } from "i18next";

export default function ShowGame({ game, sport, playground, teams }: ShowGameListProps) {
    return (
        <AppLayout title={t('pages.games.match')} >
            <ShowGameLists 
                game={game} 
                sport={sport} 
                playground={playground} 
                teams={teams} 
            />
        </AppLayout>
    )
}