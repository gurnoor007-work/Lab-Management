import React from "react";
import chem_logo from "../../assets/Logo.png";
import { NotebookTabs, BookMarked, Users, CalendarDays, MapPin, Pencil, Copy, Download } from "lucide-react";
import { format } from "date-fns";
import { HeaderButtons } from "./HeaderButtons";
import { HeaderOtherOptions } from "./HeaderOtherOptions";

export const ChemExpHeader = ({ data }) => {
    // const date = new Date(data.date);

    const formatDate = (dateString) => {
        if (!dateString) {
            return "helo";
        }
        return format(new Date(dateString), "do MMMM, yyyy");
    };
    console.log(data);
    const status = data.status;

    const expStatus = (
        <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium shadow-sm
            ${
                status === "draft"
                    ? "bg-orange-100 text-orange-700"
                    : status === "upcoming"
                      ? "bg-red-100 text-red-700"
                      : status === "ongoing"
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-700"
            }`}
        >
            <span
                className={`w-2 h-2 rounded-full
                ${
                    status === "draft"
                        ? "bg-orange-500"
                        : status === "upcoming"
                          ? "bg-red-500"
                          : status === "ongoing"
                            ? "bg-green-500"
                            : "bg-gray-500"
                }`}
            />
            <span className="capitalize">{status}</span>
        </div>
    );

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
                        <div className="exp-title">
                            <span className="text-3xl text-gray-600">{data.title}</span>
                        </div>
                        <div className="header-details flex flex-row items-center justify-between gap-7">
                            <span className="flex flex-row items-center gap-2 text-gray-600 text-md">
                                <BookMarked size="1em" /> {data.course}
                            </span>
                            <span className="flex flex-row items-center gap-2 text-gray-600 text-md">
                                <Users size="1em" /> {data.lab_group}
                            </span>
                            <span className="flex flex-row items-center gap-2 text-gray-600 text-md">
                                <CalendarDays size="1em" /> {formatDate(data.date)}
                            </span>
                            <span className="flex flex-row items-center gap-2 text-gray-600 text-md">
                                <MapPin size="1em" /> {data.location}
                            </span>
                            <div className="">{expStatus}</div>
                        </div>
                    </div>
                </div>
                <div className="header-buttons flex flex-row items-center gap-3">
                    <HeaderButtons text={<span className="flex flex-row items-center gap-2 text-md"><Pencil size="1em"/>Edit</span>}/>
                    <HeaderButtons text={<span className="flex flex-row items-center gap-2 text-md"><Copy size="1em"/>Duplicate</span>}/>
                    <HeaderButtons text={<span className="flex flex-row items-center gap-2 text-md"><Download size="1em"/>Export</span>}/>
                    <HeaderOtherOptions />
                </div>
            </div>
        </div>
    );
};
