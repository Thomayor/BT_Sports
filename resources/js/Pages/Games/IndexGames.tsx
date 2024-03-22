import { ShowGamesProps } from "@/types";
import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import IndexGameTable from "./Partials/IndexGameTable";

export default function IndexGames({ games, sports, playgrounds, teams }: ShowGamesProps) {
    return (
        <AppLayout title="Games" >
            <IndexGameTable 
                games={games} 
                sports={sports} 
                playgrounds={playgrounds} 
                teams={teams} 
            />
        </AppLayout>
    )
}