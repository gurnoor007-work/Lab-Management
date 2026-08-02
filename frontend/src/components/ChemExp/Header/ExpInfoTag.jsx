import React, { useRef, useState } from "react";
import API from "../../../api";
import { useParams } from "react-router-dom";
import { useExpData } from "../../../context/ExpDataContext";

export const ExpInfoTag = ({ icon, field, inputType="text", textSize="md" }) => {
    const { expData, setExpData } = useExpData();
    const val = expData[field]

    const { id } = useParams();
    const [editing, setEditing] = useState(false);
    const [width, setWidth] = useState(0);

    const [newVal, setNewVal] = useState(val);

    const spanRef = useRef(null);

    const handleClick = async (attribute, new_val) => {
        setEditing(true);
        if (spanRef.current) {
            setWidth(spanRef.current.offsetWidth);
        }
    };
    const cancelEditing = () => {
        setNewVal(val);
        setEditing(false);
    };

    const saveChanges = async () => {
        setEditing(false);

        // Don't send request if nothing changed
        if (newVal === val) return;

        setExpData((prev) => ({
            ...prev,
            [field]: newVal,
        }));
        try {
            await API.patch(`api/experiments/chemistry/edit/${id}`, {
                [field]: newVal,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const inputBox = (
        <input
            type={inputType}
            value={newVal}
            style={{ width: `${width}px` }}
            className="border-b border-blue-500 outline-none bg-transparent"
            onChange={(e) => setNewVal(e.target.value)}
            onBlur={saveChanges}
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    saveChanges();
                }

                if (e.key === "Escape") {
                    cancelEditing();
                }
            }}
            autoFocus
        />
    );

    return (
        <span
            className={`flex flex-row items-center gap-2 w-fit text-gray-600 text-${textSize} hover:cursor-pointer`}
            onClick={handleClick}
            ref={spanRef}
        >
            {icon} {!editing ? val : inputBox}
        </span>
    );
};
