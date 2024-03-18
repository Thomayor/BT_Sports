import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import EditGameForm from "./Partials/EditGameForm";

export default function EditGame() {
    return (
        <AppLayout
            title="Create Team"
            renderHeader={() => (
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
                    Update Game
                </h2>
            )}
        >
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <EditGameForm />
                </div>
            </div>
        </AppLayout>
    )
}