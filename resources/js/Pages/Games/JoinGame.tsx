import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import JoinGameForm from "./Partials/JoinGameForm";
import { JoinGameProps } from "@/types";

export default function JoinGame({ game, teams }: JoinGameProps) {
    return (
        <AppLayout
            title="Join Game"
        >
            <JoinGameForm 
                game={game} 
                teams={teams}
            />
        </AppLayout>
    )
}