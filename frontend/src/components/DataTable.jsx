import React, { useState } from "react";
import { Trash2 } from "lucide-react";

const defaultData = {
    columns: ["Observation", "Value"],
    rows: [["", ""]],
};

export const DataTable = ({
    initialData = defaultData,
    onChange = () => {},
}) => {
    const [tableData, setTableData] = useState(initialData);

    const updateData = (newData) => {
        setTableData(newData);
        onChange(newData);
    };

    const addColumn = () => {
        updateData({
            columns: [
                ...tableData.columns,
                `Column ${tableData.columns.length + 1}`,
            ],
            rows: tableData.rows.map((row) => [...row, ""]),
        });
    };

    const deleteColumn = (colIndex) => {
        if (tableData.columns.length === 1) return;

        updateData({
            columns: tableData.columns.filter((_, i) => i !== colIndex),
            rows: tableData.rows.map((row) =>
                row.filter((_, i) => i !== colIndex),
            ),
        });
    };

    const addRow = () => {
        updateData({
            ...tableData,
            rows: [
                ...tableData.rows,
                Array(tableData.columns.length).fill(""),
            ],
        });
    };

    const deleteRow = (rowIndex) => {
        if (tableData.rows.length === 1) return;

        updateData({
            ...tableData,
            rows: tableData.rows.filter((_, i) => i !== rowIndex),
        });
    };

    const updateColumnHeader = (index, value) => {
        const columns = [...tableData.columns];
        columns[index] = value;

        updateData({
            ...tableData,
            columns,
        });
    };

    const updateCell = (rowIndex, colIndex, value) => {
        const rows = [...tableData.rows];
        rows[rowIndex][colIndex] = value;

        updateData({
            ...tableData,
            rows,
        });
    };

    return (
        <div className="flex h-full min-h-0 flex-col gap-4">
            {/* Toolbar */}
            <div className="flex gap-2 shrink-0">
                <button
                    onClick={addColumn}
                    className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
                >
                    + Column
                </button>

                <button
                    onClick={addRow}
                    className="rounded-lg border border-gray-300 px-4 py-2 transition hover:bg-gray-100"
                >
                    + Row
                </button>
            </div>

            {/* Scrollable Table Area */}
            <div className="flex-1 min-h-0 overflow-auto rounded-xl border border-gray-200 bg-white">
                <table className="min-w-max border-collapse">
                    <thead>
                        <tr>
                            {tableData.columns.map((column, colIndex) => (
                                <th
                                    key={colIndex}
                                    className="
                                        sticky top-0 z-20
                                        bg-gray-50
                                        group
                                        min-w-[220px]
                                        border-r border-b
                                        border-gray-200
                                        p-0
                                        last:border-r-0
                                    "
                                >
                                    <div className="flex items-center">
                                        <input
                                            type="text"
                                            value={column}
                                            onChange={(e) =>
                                                updateColumnHeader(
                                                    colIndex,
                                                    e.target.value,
                                                )
                                            }
                                            className="
                                                w-full
                                                bg-transparent
                                                px-4 py-3
                                                font-semibold
                                                text-gray-700
                                                outline-none
                                            "
                                        />

                                        <button
                                            onClick={() =>
                                                deleteColumn(colIndex)
                                            }
                                            className="
                                                mr-2
                                                rounded-md
                                                p-1.5
                                                text-red-500
                                                opacity-0
                                                transition-all
                                                duration-200
                                                hover:bg-red-50
                                                group-hover:opacity-100
                                            "
                                        >
                                            <Trash2 size="1em" />
                                        </button>
                                    </div>
                                </th>
                            ))}

                            <th
                                className="
                                    sticky top-0 z-20
                                    bg-gray-50
                                    w-12
                                    border-b border-gray-200
                                "
                            />
                        </tr>
                    </thead>

                    <tbody>
                        {tableData.rows.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="group hover:bg-gray-50 transition-colors"
                            >
                                {row.map((cell, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="
                                            min-w-[220px]
                                            border-r border-b
                                            border-gray-200
                                            p-0
                                            last:border-r-0
                                        "
                                    >
                                        <input
                                            type="text"
                                            value={cell}
                                            onChange={(e) =>
                                                updateCell(
                                                    rowIndex,
                                                    colIndex,
                                                    e.target.value,
                                                )
                                            }
                                            className="
                                                w-full
                                                bg-transparent
                                                px-4 py-3
                                                text-gray-700
                                                outline-none
                                            "
                                        />
                                    </td>
                                ))}

                                <td className="border-b border-gray-200 text-center">
                                    <button
                                        onClick={() => deleteRow(rowIndex)}
                                        className="
                                            rounded-md
                                            p-1.5
                                            text-red-500
                                            opacity-0
                                            transition-all
                                            duration-200
                                            hover:bg-red-50
                                            group-hover:opacity-100
                                        "
                                    >
                                        <Trash2 size="1em" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};