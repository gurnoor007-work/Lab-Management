import React from "react";

export const InputField = ({ label = "None", placeholder = "none", val, onChange }) => {
    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <input
                value={val}
                onChange={onChange}
                type="text"
                className="
                        w-full
                        rounded-lg
                        border border-gray-300
                        px-4 py-2
                        text-gray-900
                        placeholder:text-gray-400
                        outline-none
                        transition
                        focus:border-blue-500
                        focus:ring-2
                        focus:ring-blue-200
                        "
                placeholder={placeholder}
            />
        </div>
    );
};
