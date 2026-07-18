import { useState } from "react";
import { createPortal, useRef } from "react-dom";
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
            <div className="absolute inset-0 bg-black/50 backdrop-blur-md" onClick={onClose} />

            <div className="relative flex h-full items-center justify-center">
                <div
                    className="rounded-xl bg-white p-15 shadow-xl w-[60%] max-h-[90%]"
                    ref={containerRef}
                >
                    <div className="input-area overflow-y-auto">
                        <div className="text-3xl border-b border-gray-200 mb-7">
                            Create Experiment.
                        </div>
                        <div className="inputs flex flex-col gap-8">
                            <BasicInfo data={formData} setData={setFormData} />
                            <ChemDetails data={formData} setData={setFormData} />
                        </div>
                    </div>
                    <div className="submit-buttons select-none">
                        <div className="buttons flex justify-end gap-3 pt-6 border-t border-gray-200 mt-7">
                            <button
                                className="px-5 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-700 font-medium
                   hover:bg-gray-50 hover:border-gray-400
                   transition-colors duration-200 hover:cursor-pointer"
                                onClick={onClose}
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
