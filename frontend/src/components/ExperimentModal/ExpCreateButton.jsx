import React from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

export const ExpCreateButton = ({ data }) => {
    const navigate = useNavigate();
    const handleClick = async () => {
        console.log(data);
        try {
            const resp = API.post("api/experiments/chemistry/create/", data);
            if (resp.status === 201) {
                navigate(`/experiment/chemistry/${resp.data.id}`);
                return;
            }
        } catch (err) {
            console.log("error: ", err.response?.data);
            return;
        }
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
