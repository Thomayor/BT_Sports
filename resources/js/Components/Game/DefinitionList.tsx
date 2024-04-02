import { DefinitionListProps } from "@/types";
import React from "react";

const DefinitionList: React.FC<DefinitionListProps> = ({ children }) => {
    return (
        <div className="m-6 border-t border-gray-100 flex justify-center">
            <dl className="divide-y divide-gray-100">
                {children}
            </dl>   
        </div>
    )
}

export default DefinitionList;