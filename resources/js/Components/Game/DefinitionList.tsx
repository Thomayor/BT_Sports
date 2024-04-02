import { DefinitionListProps } from "@/types";
import React from "react";

const DefinitionList: React.FC<DefinitionListProps> = ({ children }) => {
    return (
        <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
                {children}
            </dl>   
        </div>
    )
}

export default DefinitionList;