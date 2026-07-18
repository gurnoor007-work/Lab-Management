import React from "react";
import { InputField } from "../InputField";
import { NotepadText, FlaskConical } from "lucide-react";

export const ChemDetails = ({ data, setData }) => {
    return (
        <div className="">
            <div className="title mb-5">
                <span className="text-[#2563EB] font-semibold text-xl">Chem. Specific Details</span>
            </div>
            <div className="grid grid-cols-3 gap-5 text-sm">
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <NotepadText /> Main Reaction / Topic
                        </span>
                    }
                    placeholder={"Neutralization Reaction"}
                    val={data.reaction}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            reaction: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <FlaskConical /> Chemicals / Reagents
                        </span>
                    }
                    placeholder={"Phenolphthalein, HCl, NaOH"}
                    val={data.chemicals}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            chemicals: e.target.value,
                        }));
                    }}
                />
            </div>
        </div>
    );
};
