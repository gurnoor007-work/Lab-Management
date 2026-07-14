import React from "react";

export const HeadingButtons = () => {
    return (
        <div className="project-experiment flex gap-5">
            <div className="experiment-button flex flex-col gap-5">
                <button className="bg-[#2563EB] text-white text-3xl font-semibold rounded-lg px-6 py-4 hover:bg-[#1D4ED8] hover:cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300">
                    Experiment
                </button>
                <ul className="mt-4 space-y-3 text-gray-600 text-xl font-semibold w-[90%]">
                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Regular class experiments</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Tracking of observations and readings</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Export of reports</span>
                    </li>
                </ul>
            </div>
            <div className="project-button flex flex-col gap-5">
                <button className="bg-[#2563EB] text-white text-3xl font-semibold rounded-lg px-6 py-4 hover:bg-[#1D4ED8] hover:cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300">
                    Project
                </button>
                <ul className="mt-4 space-y-3 text-gray-600 text-xl font-semibold w-[90%]">
                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Research, Masters and PhD projects</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Papers upload, plagarism verify</span>
                    </li>

                    <li className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        <span>Professional reports</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};
