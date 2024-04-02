import AppLayout from "@/Layouts/AppLayout";
import { ShowSportsProps, Sport } from "@/types";
import React from "react";
import IndexSportsTable from "./Partials/IndexSportsTable";

export default function IndexSports({ sports }: ShowSportsProps) {
    return (
        <AppLayout 
            title="Sports Lists"
        >   
            <IndexSportsTable sports={sports} />
        </AppLayout>
    )
}