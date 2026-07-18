import React from "react";
import { InputField } from "./InputField";
import { NotepadText, FlaskConical, User, CalendarDays, Users, Building2 } from "lucide-react";
import { DateField } from "./DateField";
import { TextArea } from "./TextArea";

export const BasicInfo = ({ data, setData }) => {
    return (
        <div className="">
            <div className="title mb-5">
                <span className="text-[#2563EB] font-semibold text-xl">Basic Information</span>
            </div>
            <div className="grid grid-cols-2 gap-5 text-sm">
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <NotepadText /> Experiment Title
                        </span>
                    }
                    placeholder={"Acid-Base Titration of HCl with NaOH"}
                    val={data.title}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            title: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <FlaskConical /> Course / Lab
                        </span>
                    }
                    placeholder={"CH1202 - General Chemistry Lab"}
                    val={data.course}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            course: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <User /> Supervisor / Instructor
                        </span>
                    }
                    placeholder={"Prof. Raja Shunmugam"}
                    val={data.supervisor}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            supervisor: e.target.value,
                        }));
                    }}
                />
                <DateField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <CalendarDays /> Experiment Date
                        </span>
                    }
                    placeholder={"Acid Base Titration"}
                    val={data.date}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            date: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <Users /> Lab Section / Group
                        </span>
                    }
                    placeholder={"Group A"}
                    val={data.lab_group}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            lab_group: e.target.value,
                        }));
                    }}
                />
                <InputField
                    label={
                        <span className="text-[#6B7280] flex items-center gap-1">
                            <Building2 /> Location (Lab / Room)
                        </span>
                    }
                    placeholder={"Chemistry Lab 1"}
                    val={data.location}
                    onChange={(e) => {
                        setData((prev) => ({
                            ...prev,
                            location: e.target.value,
                        }));
                    }}
                />
                <div className="description col-span-2">
                    <TextArea
                        label={
                            <span className="text-[#6B7280] flex items-center gap-1">
                                <Building2 /> Description
                            </span>
                        }
                        placeholder={"A short description of experiment..."}
                        val={data.description}
                        onChange={(e) => {
                            setData((prev) => ({
                                ...prev,
                                description: e.target.value,
                            }));
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
