import React, { useEffect, useState } from "react";
import { data, useParams } from "react-router-dom";
import API from "../../../api";
import { ChemExpHeader } from "../../../components/ChemExp/ChemExpHeader";
import { ActionCard } from "../../../components/ChemExp/ActionCard";

import { ClipboardList, CheckCircle2, ListChecks } from "lucide-react";

export const ChemExpPage = () => {
    console.log("Chem page rendered");
    const { id } = useParams();

    const [expData, setExpData] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [forbidden, setForbidden] = useState(false);

    const [loading, setLoading] = useState(false);

    const getExperiment = async () => {
        setNotFound(false);
        setForbidden(false);
        setLoading(true);

        try {
            const resp = await API.get(`api/experiments/chemistry/get/${id}`);
            if (resp.status === 200) {
                setExpData(resp.data.data);
                return;
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setNotFound(true);
                return;
            }
            if (err.response?.status === 403) {
                setForbidden(true);
                return;
            } else {
                console.log("internal server error while retrieving experiment");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getExperiment();
    }, [id]);

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

    const procedureSummary = {
        title: "Step-by-step procedure followed during the experiment",
        items: [
            "Weigh approximately 0.5 g of dry unknown sample into a 400-ml beaker.",
            "Add 20 ml of 15 M nitric acid, cover, and warm gently until red fumes cease.",
            "If black particles remain, add 5 ml of 12 M HCl and heat briefly under the hood.",
            "Cool the solution, add 20 ml of 12 M HCl, and evaporate to dryness.",
            "Bake at 110°C for one hour, then cool and add 10 ml of 12 M HCl.",
            "Heat briefly, dilute with 100 ml of hot water, and place on a hot plate for 15 minutes.",
            "Filter through fine qualitative paper, washing well with hot water into a 400-ml beaker.",
            "Add 10 ml of 20% ammonium chloride solution and 20 ml of 10% tartaric acid to the filtrate.",
            "Dilute the mixture to 200 ml and heat until nearly boiling.",
            "Cautiously add ammonium hydroxide (1:1) until the solution is slightly alkaline.",
            "Return the solution to feebly acidic by adding a few ml of HCl to ensure filterable precipitation.",
            "Add 15 ml of 1% alcoholic dimethylglyoxime solution drop-wise using a buret.",
            "Add 1:1 ammonium hydroxide until just alkaline, followed by 2-3 drops in excess.",
            "Stir vigorously to form a dense red precipitate and place on a hot plate for 15-20 minutes.",
            "Stir occasionally, check alkalinity, and filter through a constant-weight sintered glass crucible.",
            "Wash the precipitate well with hot water containing 2-3 drops of ammonium hydroxide.",
            "Dry the crucible and precipitate at 110-120°C for 2 hours.",
            "Cool and weigh as nickel dimethylglyoxime (C₈H₁₄N₄O₄Ni), which contains 20.32% Ni.",
            "Repeat heating, cooling, and weighing until constant weight is achieved (difference < 0.5 mg).",
            "Calculate the percent nickel in the original sample based on the final weight.",
        ],
    };
    const previewCount = 5;

    return (
        <div className="chem-exp flex flex-col items-center">
            <div className="header flex flex-row">
                <ChemExpHeader data={expData} />
            </div>
            <div className="cards grid grid-cols-3 gap-5 w-[75%]">
                <ActionCard
                    icon={
                        <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center shadow-xs">
                            <ClipboardList className="w-7 h-7 text-blue-600" />
                        </div>
                    }
                    title={<span className="text-2xl font-semibold text-gray-600">Procedure</span>}
                    title_status={
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Completed
                        </div>
                    }
                    preview_elem={
                        <div className="flex flex-col gap-5">
                            <span className="">{procedureSummary.title}</span>
                            <div className="px-4">
                                <ul className="space-y-3 text-md text-gray-500">
                                    {procedureSummary.items
                                        .slice(0, previewCount)
                                        .map((item, index) => (
                                            <li key={index} className="flex items-center gap-2">
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
                                        +{procedureSummary.items.length - previewCount} more steps →
                                    </button>
                                )}
                            </div>
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
                                <span className="text-sm text-gray-700">{formatDateTime(expData.updated_at)}</span>
                            </div>
                        </div>
                    }
                />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
                <ActionCard />
            </div>
        </div>
    );
};
