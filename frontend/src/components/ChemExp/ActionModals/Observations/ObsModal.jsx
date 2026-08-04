import React, { useState } from "react";
import { createPortal } from "react-dom";
import { DataTable } from "../../../DataTable";
import API from "../../../../api";
import { useParams } from "react-router-dom";
import { useExpData } from "../../../../context/ExpDataContext";

export const ObsModal = ({ open, onClose, icon, title, title_status }) => {
    const { id } = useParams();
    const { expData, setExpData } = useExpData();
    const [obsData, setObsData] = useState(expData.chemistry.observations);

    const handleSubmit = async () => {
        try {
            const resp = await API.patch(`api/experiments/chemistry/edit/${id}`, {
                chemistry: {
                    observations: obsData,
                },
            });

            if (resp.status === 200) {
                setExpData((prev) => ({
                    ...prev,
                    chemistry: {
                        ...prev.chemistry,
                        observations: obsData,
                    },
                }));
            }
        } catch (err) {
            console.log({ status: err.response?.status, error: err.response?.data });
        } finally {
            window.location.reload();
        }
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center ${
                open ? "visible bg-black/20 backdrop-blur-xs" : "invisible"
            }`}
            onClick={onClose}
        >
            <div
                className={`w-4xl h-[75vh] rounded-2xl bg-white shadow-2xl flex flex-col transition-all duration-200 ${
                    open ? "opacity-100 scale-100" : "opacity-0 scale-110"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 shrink-0">
                    <div className="flex items-center gap-3">
                        {icon}
                        {title}
                    </div>

                    {title_status}
                </div>

                {/* Content */}
                <div className="flex-1 min-h-0 px-8 py-6">
                    <DataTable />
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-200 px-8 py-5 shrink-0">
                    <button
                        onClick={onClose}
                        className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        onClick={handleSubmit}
                        className="rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
