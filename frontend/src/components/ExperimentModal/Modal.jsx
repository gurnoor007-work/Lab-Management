import { useState } from "react";
import { createPortal } from "react-dom";
import { BasicInfo } from "./BasicInfo";
import { ChemDetails } from "./Chemistry/ChemDetails";
import { ExpCreateButton } from "./ExpCreateButton";

export const Modal = ({ onClose, containerRef }) => {
    const [formData, setFormData] = useState({
        title: "",
        course: "",
        supervisor: "",
        date: "",
        lab_group: "",
        location: "",
        description: "",
        reaction: "",
        chemicals: "",
    });

    return createPortal(
        <div className="fixed inset-0 z-50">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Container */}
            <div className="relative flex h-full items-center justify-center p-6">
                <div
                    ref={containerRef}
                    className="w-[60%] h-[90vh] bg-white rounded-xl shadow-xl flex flex-col"
                >
                    {/* Header */}
                    <div className="px-8 py-6 border-b border-gray-200 shrink-0">
                        <h1 className="text-3xl font-medium">
                            Create Experiment.
                        </h1>
                    </div>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto px-8 py-6">
                        <div className="flex flex-col gap-8">
                            <BasicInfo
                                data={formData}
                                setData={setFormData}
                            />

                            <ChemDetails
                                data={formData}
                                setData={setFormData}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="px-8 py-6 border-t border-gray-200 shrink-0">
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="
                                    px-5 py-2.5
                                    rounded-lg
                                    border border-gray-300
                                    bg-white
                                    text-gray-700
                                    font-medium
                                    hover:bg-gray-50
                                    hover:border-gray-400
                                    transition-colors
                                    duration-200
                                    cursor-pointer
                                "
                            >
                                Cancel
                            </button>

                            <ExpCreateButton data={formData} />
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.body,
    );
};