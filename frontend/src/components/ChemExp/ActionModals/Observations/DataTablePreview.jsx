import React from "react";
import { NoPreviewAvailable } from "../../../NoPreviewAvailable";
import { th } from "date-fns/locale";

export const DataTablePreview = ({ data, n_cols, n_rows }) => {
    const columns = data.columns.slice(0, n_cols);
    const rows = data.rows.slice(0, n_rows).map((row) => row.slice(0, n_cols));

    return (
        <div className="preview-carrier-obs flex w-full">
            {data.rows[0].every((x) => x === "") ? (
                <NoPreviewAvailable />
            ) : (
                <div className="rounded-xl overflow-hidden border border-gray-100">
                    <table className="w-full table-fixed border-collapse">
                        <thead>
                            <tr>
                                {columns.map((column, colIndex) => (
                                    <th
                                        key={colIndex}
                                        className="
                                        bg-gray-50
                                        group
                                        text-gray-500
                                        p-0
                                        last:border-r-0
                                    "
                                    >
                                        {column}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr key={rowIndex}>
                                    {row.map((cell, cellIndex) => (
                                        <td
                                            key={cellIndex}
                                            className="text-center align-middle py-0.5 text-gray-600 border border-gray-100"
                                        >
                                            {cell}
                                        </td>
                                    ))}
                                    {row.length > n_cols && (
                                        <td className="text-center align-middle py-0.5 text-gray-600 border border-gray-100">
                                            ...
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
