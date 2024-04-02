import AppLayout from "@/Layouts/AppLayout";
import { ShowSportsProps, Sport } from "@/types";
import React from "react";
import IndexSportsTable from "./Partials/IndexSportsTable";
import { t } from "i18next";

export default function IndexSports({ sports }: ShowSportsProps) {
    return (
        <AppLayout 
            title={t('pages.sports.list')}
        >   
            <IndexSportsTable sports={sports} />
        </AppLayout>
    )
}