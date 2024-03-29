import React from "react";
import classNames from "classnames";
import { TableProps } from "@/types";

const TableHeaderCell: React.FC<TableProps> = ({ children, className }) => {
    return (
        <th className={classNames("px-6 py-3", className)}>
            {children}
        </th>
    )
}

export default TableHeaderCell;
