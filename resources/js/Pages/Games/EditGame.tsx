import AppLayout from "@/Layouts/AppLayout";
import React from "react";
import EditGameForm from "./Partials/EditGameForm";

export default function EditGame() {
    return (
        <AppLayout
            title="Edit Game"
        >  
            <div>
                <div className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                    <EditGameForm />
                </div>
            </div>
        </AppLayout>
    )
}