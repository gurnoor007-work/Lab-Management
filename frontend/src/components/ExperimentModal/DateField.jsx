import React, {useState} from "react";

export const DateField = ({ label, placeholder, val, onChange  }) => {
    const [date, setDate] = useState(
    new Date().toISOString().split("T")[0]
);

    return (
        <div className="flex flex-col gap-2">
            <label>{label}</label>
            <input
                type="date"
                value={val != "" ? val : date}
                onChange={onChange}
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
