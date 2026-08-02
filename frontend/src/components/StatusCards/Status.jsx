import React from "react";

const STATUS = {
    draft: {
        bg: "bg-gray-100",
        text: "text-gray-700",
        dot: "bg-gray-500",
        label: "Draft",
    },

    upcoming: {
        bg: "bg-blue-100",
        text: "text-blue-700",
        dot: "bg-blue-500",
        label: "Upcoming",
    },

    ongoing: {
        bg: "bg-green-100",
        text: "text-green-700",
        dot: "bg-green-500",
        label: "Ongoing",
    },

    completed: {
        bg: "bg-emerald-100",
        text: "text-emerald-700",
        dot: "bg-emerald-500",
        label: "Completed",
    },

    archived: {
        bg: "bg-slate-100",
        text: "text-slate-700",
        dot: "bg-slate-500",
        label: "Archived",
    },
};

export const StatusCard = ({ status }) => {
    const s = STATUS[status] || STATUS.draft;

    return (
        <div
            className={`
                inline-flex
                items-center
                gap-2
                rounded-full
                px-4
                py-2
                ${s.bg}
                ${s.text}
                font-medium
                text-sm
                select-none
            `}
        >
            <div
                className={`h-2.5 w-2.5 rounded-full ${s.dot}`}
            />

            {s.label}
        </div>
    );
};