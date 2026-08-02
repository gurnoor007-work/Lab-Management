import React from "react";

export const ActionCard = ({
    title = "title",
    icon,
    title_status,
    preview_elem,
    bottom_summary,
    setShowModal,
}) => {
    return (
        <div
            className="card p-5 rounded-lg border border-[#E5E7EB] bg-[#FFFFFF] hover:scale-103 hover:cursor-pointer transition-transform duration-300"
            onClick={() => setShowModal(true)}
        >
            <div className="carrier ">
                <div className="title-section flex jutify-around pb-5 border-b border-[#E5E7EB]">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            {icon}
                            {title}
                        </div>
                        {title_status}
                    </div>
                </div>
                <div className="preview-area px-10 py-7">{preview_elem}</div>
                <div className="bottom-summary pt-5 border-t border-[#E5E7EB]">
                    {bottom_summary}
                </div>
            </div>
        </div>
    );
};
