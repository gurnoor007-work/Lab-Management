import React from "react";
import chem_logo from "../../../assets/Logo.png";
import {
    NotebookTabs,
    BookMarked,
    Users,
    CalendarDays,
    MapPin,
    Pencil,
    Copy,
    Download,
} from "lucide-react";
import { format } from "date-fns";
import { HeaderButtons } from "../HeaderButtons";
import { HeaderOtherOptions } from "../HeaderOtherOptions";
import { ExpInfoTag } from "./ExpInfoTag";

import { useExpData } from "../../../context/ExpDataContext";
import { StatusCard } from "../../StatusCards/Status";

export const ChemExpHeader = () => {
    const { expData } = useExpData();
    const data = expData;

    const formatDate = (dateString) => {
        if (!dateString) {
            return "helo";
        }
        return format(new Date(dateString), "do MMMM, yyyy");
    };
    console.log(data);
    const status = data.status;

    return (
        <div className="flex items-center w-screen bg-amber-2 pt-10 pb-4 px-10">
            <div className="flex items-center w-full justify-between bg-amber-2 py-5 px-5 rounded-3xl bg-[#F3F4F6] z-50 shadow-lg">
                <div className="left-header flex items-center">
                    <img
                        src={chem_logo}
                        alt="Logo"
                        className="h-15 w-15 md:h-30 md:w-30 rounded-2xl hover:scale-103 transition-transform duration-200"
                    />
                    <div className="flex flex-col px-7 gap-3">
                        <ExpInfoTag val={data.course} field="title" textSize="3xl" />
                        <div className="header-details flex flex-row items-center justify-between gap-7">
                            <ExpInfoTag
                                icon={<BookMarked size="1em" />}
                                val={data.course}
                                field="course"
                            />
                            <ExpInfoTag
                                icon={<Users size="1em" />}
                                val={data.lab_group}
                                field="lab_group"
                            />
                            <ExpInfoTag
                                icon={<CalendarDays size="1em" />}
                                val={formatDate(data.date)}
                                field="date"
                                inputType={"date"}
                            />
                            <ExpInfoTag
                                icon={<MapPin size="1em" />}
                                val={data.location}
                                field="location"
                            />
                            <div className="">
                                <StatusCard status={expData.status} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-buttons flex flex-row items-center gap-3">
                    <HeaderButtons
                        text={
                            <span className="flex flex-row items-center gap-2 text-md">
                                <Pencil size="1em" />
                                Edit
                            </span>
                        }
                    />
                    <HeaderButtons
                        text={
                            <span className="flex flex-row items-center gap-2 text-md">
                                <Copy size="1em" />
                                Duplicate
                            </span>
                        }
                    />
                    <HeaderButtons
                        text={
                            <span className="flex flex-row items-center gap-2 text-md">
                                <Download size="1em" />
                                Export
                            </span>
                        }
                    />
                    <HeaderOtherOptions />
                </div>
            </div>
        </div>
    );
};
