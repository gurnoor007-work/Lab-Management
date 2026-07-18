import React from "react";

export const ExpCreateButton = ({ data }) => {
    const handleClick = async () => {
        console.log(data);
    };
    return (
        <button
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium
                   hover:bg-blue-700 active:bg-blue-800
                   shadow-sm hover:shadow-md
                   transition-all duration-200 hover:cursor-pointer"
            onClick={handleClick}
        >
            + Create Experiment
        </button>
    );
};
