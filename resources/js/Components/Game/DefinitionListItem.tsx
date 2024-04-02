import { DefinitionListItemProps } from "@/types";
import React from "react";

const DefinitionListItem: React.FC<DefinitionListItemProps> = ({ term, description }) => {
    return (
        <div className="flex flex-row px-4 py-2 grid-cols-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm mr-2 font-semibold leading-6 text-gray-900">
                {term}
            </dt>
            <dd className="text-sm leading-6 text-gray-700 sm:col-span-2">
                {description}
            </dd>
        </div>
    )
}

export default DefinitionListItem