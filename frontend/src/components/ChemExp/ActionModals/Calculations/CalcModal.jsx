import React from "react";
import { createPortal } from "react-dom";
import { MathBlock } from "../../../MathBlock/MathBlock";

export const CalcModal = ({ open, onClose, icon, title, title_status }) => {
    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center px-10 ${
                open ? "visible bg-black/20 backdrop-blur-xs" : "invisible"
            }`}
            onClick={onClose}
        >
            <div
                className={`w-full h-[75vh] rounded-2xl bg-white shadow-2xl flex flex-col transition-all duration-200 ${
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
                <div className="flex-1 min-h-0 px-8 py-6 overflow-y-auto">
                    <MathBlock />
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
