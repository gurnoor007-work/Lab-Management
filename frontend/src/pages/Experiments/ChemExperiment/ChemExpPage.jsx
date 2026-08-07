import React, { useEffect, useRef, useState } from "react";
import { data, useParams } from "react-router-dom";
import API from "../../../api";
import { ChemExpHeader } from "../../../components/ChemExp/Header/ChemExpHeader";
import { ActionCard } from "../../../components/ChemExp/ActionCard";

import { useExpData } from "../../../context/ExpDataContext";

import { ClipboardList, CheckCircle2, ListChecks, Eye } from "lucide-react";
import { ProcedureModal } from "../../../components/ChemExp/ActionModals/Procedure/ProcedureModal";
import { NoPreviewAvailable } from "../../../components/NoPreviewAvailable";
import { StatusCard } from "../../../components/StatusCards/Status";
import { ObsModal } from "../../../components/ChemExp/ActionModals/Observations/ObsModal";
import { DataTablePreview } from "../../../components/ChemExp/ActionModals/Observations/DataTablePreview";

export const ChemExpPage = () => {
    const { expData, notFound, forbidden, loading } = useExpData();
    const { id } = useParams();

    const [showProcedure, setShowProcedure] = useState(false);
    const [showObs, setShowObs] = useState(false);

    const [procedureStatus, setProcedureStatus] = useState(0);
    const [obsStatus, setObsStatus] = useState(0);
    const procedureRef = useRef(null);
    const obsRef = useRef(null);

    if (loading) {
        return <div>Loading...</div>;
    }
    if (notFound) {
        return <div>Not Found</div>;
    }
    if (forbidden) {
        return <div>forbidden</div>;
    }
    console.log(expData);

    function formatDateTime(dateString) {
        const date = new Date(dateString);

        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }

    const procedureSummary = expData.chemistry.procedure;
    const previewCount = 5;

    const statusList = ["draft", "ongoing", "completed"];
    const handleProcedureStatus = async () => {
        try {
            const resp = await API.patch(`api/experiments/chemistry/edit/${id}`, {
                chemistry: {
                    procedure: {
                        status: statusList[(procedureStatus + 1) % statusList.length],
                    },
                },
            });
            if (resp.status === 200) {
                setProcedureStatus((prev) => (prev + 1) % statusList.length);
            }
        } catch (err) {
            console.log({ status: err.response?.status, error: err.response?.data });
        }
    };
    const handleObsStatus = async () => {
        try {
            const resp = await API.patch(`api/experiments/chemistry/edit/${id}`, {
                chemistry: {
                    observations: {
                        status: statusList[(procedureStatus + 1) % statusList.length],
                    },
                },
            });
            if (resp.status === 200) {
                setObsStatus((prev) => (prev + 1) % statusList.length);
            }
        } catch (err) {
            console.log({ status: err.response?.status, error: err.response?.data });
        }
    };

    return (
        <div className="chem-exp flex flex-col items-center">
            <div className="header flex flex-row">
                <ChemExpHeader />
            </div>
            <div className="cards grid grid-cols-3 gap-5 w-[75%]">
                {/* ==========Procedure========== */}
                <ActionCard
                    icon={
                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shadow-xs">
                            <ClipboardList className="w-7 h-7 text-blue-600" />
                        </div>
                    }
                    title={<span className="text-2xl font-semibold text-gray-600">Procedure</span>}
                    title_status={
                        <div
                            className="z-10 hover:scale-105 transition duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleProcedureStatus();
                            }}
                        >
                            <StatusCard status={statusList[procedureStatus]} />
                        </div>
                    }
                    preview_elem={
                        <div className="flex flex-col gap-5">
                            {procedureSummary.items.length !== 0 ? (
                                <>
                                    <span>{procedureSummary.title}</span>

                                    <div className="px-4">
                                        <ul className="space-y-3 text-md text-gray-500">
                                            {procedureSummary.items
                                                .slice(0, previewCount)
                                                .map((item, index) => (
                                                    <li
                                                        key={index}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <span className="font-semibold text-gray-500 shrink-0">
                                                            {index + 1}.
                                                        </span>

                                                        <span className="truncate">{item}</span>
                                                    </li>
                                                ))}
                                        </ul>

                                        {procedureSummary.items.length > previewCount && (
                                            <button
                                                className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm"
                                                onClick={() => setShowProcedure(true)}
                                            >
                                                +{procedureSummary.items.length - previewCount} more
                                                steps →
                                            </button>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <NoPreviewAvailable />
                            )}
                        </div>
                    }
                    bottom_summary={
                        <div className="w-full flex justify-between">
                            <div className="left-portion flex flex-row gap-2 items-center text-md text-gray-700">
                                <ListChecks size="1em" />
                                <span className="text-sm">
                                    {procedureSummary.items.length} steps
                                </span>
                            </div>
                            <div className="right-portion flex flex-col gap-1">
                                <span className="text-xs text-gray-400">Last Updated</span>
                                <span className="text-sm text-gray-700">
                                    {formatDateTime(expData.updated_at)}
                                </span>
                            </div>
                        </div>
                    }
                    setShowModal={setShowProcedure}
                />
                {showProcedure && (
                    <ProcedureModal
                        open={showProcedure}
                        onClose={() => setShowProcedure(false)}
                        icon={
                            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shadow-xs">
                                <ClipboardList className="w-7 h-7 text-blue-600" />
                            </div>
                        }
                        title={
                            <span className="text-2xl font-semibold text-gray-600">Procedure</span>
                        }
                        title_status={
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                Completed
                            </div>
                        }
                    />
                )}

                {/* ==========Observations========== */}
                <ActionCard
                    icon={
                        <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center shadow-xs">
                            <Eye className="w-7 h-7 text-green-600" />
                        </div>
                    }
                    title={
                        <span className="text-2xl font-semibold text-gray-600">Observations</span>
                    }
                    title_status={
                        <div
                            className="z-10 hover:scale-105 transition duration-300"
                            onClick={(e) => {
                                e.stopPropagation();
                                handleObsStatus();
                            }}
                        >
                            <StatusCard status={statusList[obsStatus]} />
                        </div>
                    }
                    preview_elem={<div className="flex flex-col gap-5">
                        <DataTablePreview data={expData.chemistry.observations} n_cols={2} n_rows={3}/>
                    </div>}
                    bottom_summary={
                        <div className="w-full flex justify-between">
                            <div className="left-portion flex flex-row gap-2 items-center text-md text-gray-700">
                                <ListChecks size="1em" />
                                <span className="text-sm">
                                    {procedureSummary.items.length} steps
                                </span>
                            </div>
                            <div className="right-portion flex flex-col gap-1">
                                <span className="text-xs text-gray-400">Last Updated</span>
                                <span className="text-sm text-gray-700">
                                    {formatDateTime(expData.updated_at)}
                                </span>
                            </div>
                        </div>
                    }
                    setShowModal={setShowObs}
                />
                {showObs && (
                    <ObsModal
                        open={showObs}
                        onClose={() => setShowObs(false)}
                        containerRef={obsRef}
                        icon={
                            <div className="w-14 h-14 rounded-xl bg-green-50 flex items-center justify-center shadow-xs">
                                <Eye className="w-7 h-7 text-green-600" />
                            </div>
                        }
                        title={
                            <span className="text-2xl font-semibold text-gray-600">
                                Observations
                            </span>
                        }
                        title_status={<StatusCard status={statusList[obsStatus]} />}
                    />
                )}
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
            </div>
        </div>
    );
};
