import React, { useState, useRef, useEffect } from "react";
import { Modal } from "../ExperimentModal/Modal";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export const HeadingButtons = () => {
    const [expModal, setExpModal] = useState(false);
    const { loggedIn } = useAuth();
    const navigate = useNavigate();

    const handleExp = () => {
        if (loggedIn) {
            setExpModal(true);
        } else {
            navigate("/login");
        }
    };

    const containerRef = useRef(null);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setExpModal(false);
            }
        };

        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    return (
        <div className="project-experiment flex gap-5">
            <div className="experiment-button flex flex-col gap-5">
                <button
                    className="bg-[#2563EB] text-white text-3xl font-semibold rounded-lg px-6 py-4 hover:bg-[#1D4ED8] hover:cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300"
                    onClick={handleExp}
                >
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
                {expModal && (
                    <Modal onClose={() => setExpModal(false)} containerRef={containerRef} />
                )}
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
