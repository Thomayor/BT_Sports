import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import CreateSportForm from "./Partials/CreateSportForm";

export default function CreateSport() {
    return (
        <AppLayout 
            title="Create Sport"
        >
            <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <CreateSportForm />
            </div>
        </AppLayout>
    )
}