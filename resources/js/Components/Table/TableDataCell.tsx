import React from "react";
import classNames from "classnames";
import { TableProps } from "@/types";

const TableDataCell: React.FC<TableProps> = ({ children, className }) => {
    return (
        <td className={classNames("px-6 py-4", className)}>
            {children}
        </td>
    )
}

export default TableDataCell;