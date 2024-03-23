import React from "react";
import AppLayout from "@/Layouts/AppLayout";
import { ShowGameProps } from "@/types";
import ShowGameLists from "./Partials/ShowGameLists";

export default function ShowGame({ game, sport, playground, teams }: ShowGameProps) {
    return (
        <AppLayout title="Game" >
            <ShowGameLists 
                game={game} 
                sport={sport} 
                playground={playground} 
                teams={teams} 
            />
        </AppLayout>
    )
}