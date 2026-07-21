import React from "react";

export const ActionCard = ({ title = "title", icon, title_status, preview_elem, bottom_summary }) => {
    return (
        <div className="card p-5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:scale-103 hover:cursor-pointer transition-transform duration-300">
            <div className="carrier ">
                <div className="title-section flex jutify-around">
                    <div className="flex items-start justify-between w-full">
                        <div className="flex items-center gap-3">
                            {icon}
                            {title}
                        </div>
                        {title_status}
                    </div>
                </div>
                <div className="preview-area px-10 py-7">
                    {preview_elem}
                </div>
                <div className="bottom-summary">
                    {bottom_summary}
                </div>
            </div>
        </div>
    );
};
