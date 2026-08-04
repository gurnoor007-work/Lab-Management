import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, Pencil } from "lucide-react";
import { useExpData } from "../../../../context/ExpDataContext";
import API from "../../../../api";
import { useParams, useNavigate } from "react-router-dom";

export const ProcedureModal = ({ open, onClose, icon, title, title_status }) => {
    const { expData, setExpData } = useExpData();
    const { id } = useParams();

    const [phrase, setPhrase] = useState(expData.chemistry.procedure.title);
    const [phraseEdit, setPhraseEdit] = useState(true);

    const [items, setItems] = useState(expData.chemistry.procedure.items);
    const [itemsEditing, setItemsEditing] = useState(false);
    const [newItem, setNewItem] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);
    const [editingValue, setEditingValue] = useState("");

    const handleItemKeyDown = (e) => {
        if (e.key === "Enter") {
            if (!newItem.trim()) return;

            setItems((prev) => [...prev, newItem]);
            setNewItem("");
        }

        if (e.key === "Escape") {
            setNewItem("");
            setItemsEditing(false);
        }
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingValue(items[index]);
    };
    const saveEdit = async () => {
        if (!editingValue.trim()) return;

        setItems((prev) => prev.map((item, i) => (i === editingIndex ? editingValue : item)));

        setEditingIndex(null);
        setEditingValue("");
    };

    const deleteItem = (index) => {
        setItems((prev) => prev.filter((_, i) => i !== index));
    };
    const editItem = (index, edit_val) => {
        setItems((prev) => prev.map((item, i) => (i === index ? edit_val : item)));
    };

    const handleSubmit = async () => {
        try {
            const resp = await API.patch(`api/experiments/chemistry/edit/${id}`, {
                chemistry: {
                    procedure: {
                        title: phrase,
                        items: items,
                    },
                },
            });
            if (resp.status === 200) {
                setExpData((prev) => ({
                    ...prev,
                    chemistry: {
                        procedure: {
                            title: phrase,
                            items: items,
                        },
                    },
                }));
                onClose();
            }
        } catch (err) {
            console.log({ status: err.response?.status, error: err.response?.data });
        } finally {
            window.location.reload();
        }
    };

    return createPortal(
        <div
            className={`fixed inset-0 z-50 flex justify-center items-center ${open ? "visible bg-black/20 backdrop-blur-xs" : "invisible"}`}
            onClick={onClose}
        >
            {/* Modal */}

            <div
                className={`w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl ${open ? "opacity-100 scale-100" : "opacity-0 scale-125"}`}
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6">
                    <div className="flex items-center gap-3">
                        {icon}
                        {title}
                    </div>

                    {title_status}
                </div>

                {/* Body */}
                <div className="p-8 space-y-12">
                    {/* ================= TITLE ================= */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-gray-700">Procedure Title</h2>

                        {phraseEdit ? (
                            <input
                                autoFocus
                                type="text"
                                value={phrase}
                                placeholder="Enter procedure title..."
                                className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-lg outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                onChange={(e) => setPhrase(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        setPhraseEdit(false);
                                    }

                                    if (e.key === "Escape") {
                                        setPhraseEdit(false);
                                    }
                                }}
                            />
                        ) : (
                            <div
                                onClick={() => setPhraseEdit(true)}
                                className="cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-lg text-gray-600 transition hover:bg-gray-100"
                            >
                                {phrase || "Click to add title"}
                            </div>
                        )}
                    </section>

                    {/* ================= STEPS ================= */}
                    <section className="space-y-5">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xl font-semibold text-gray-700">Procedure Steps</h2>

                            {!itemsEditing && (
                                <button
                                    onClick={() => setItemsEditing(true)}
                                    className="hover:cursor-pointer rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                                >
                                    + Add Step
                                </button>
                            )}
                        </div>

                        {/* Existing Items */}
                        <ul className="space-y-3">
                            {items.map((item, index) => (
                                <li
                                    key={index}
                                    className="group flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-5 py-4 transition hover:shadow-md"
                                >
                                    <div className="flex gap-4">
                                        <span className="font-semibold text-gray-400">
                                            {index + 1}.
                                        </span>

                                        {editingIndex === index ? (
                                            <div>
                                                <input
                                                    autoFocus
                                                    type="text"
                                                    value={editingValue}
                                                    placeholder="Edit val..."
                                                    className="w-full rounded-xl border border-blue-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                                    onChange={(e) =>
                                                        setEditingValue(e.target.value)
                                                    }
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            saveEdit();
                                                        }

                                                        if (e.key === "Escape") {
                                                            setEditingIndex(null);
                                                            setEditingValue("");
                                                        }
                                                    }}
                                                    onBlur={saveEdit}
                                                />
                                            </div>
                                        ) : (
                                            <span className="text-gray-700">{item}</span>
                                        )}
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={() => startEditing(index)}
                                            className="opacity-0 transition group-hover:opacity-100"
                                        >
                                            <Pencil
                                                size={18}
                                                className="text-green-400 hover:text-green-600 hover:cursor-pointer"
                                            />
                                        </button>
                                        <button
                                            onClick={() => deleteItem(index)}
                                            className="opacity-0 transition group-hover:opacity-100"
                                        >
                                            <Trash2
                                                size={18}
                                                className="text-red-500 hover:text-red-600 hover:cursor-pointer"
                                            />
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        {/* Input */}
                        {itemsEditing && (
                            <input
                                autoFocus
                                type="text"
                                value={newItem}
                                placeholder="Describe the next procedure step..."
                                className="w-full rounded-xl border border-blue-300 bg-white px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                onChange={(e) => setNewItem(e.target.value)}
                                onKeyDown={handleItemKeyDown}
                            />
                        )}
                    </section>
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t border-gray-200 px-8 py-5">
                    <button
                        onClick={onClose}
                        className="hover:cursor-pointer rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                        Close
                    </button>

                    <button
                        className="hover:cursor-pointer rounded-lg bg-blue-600 px-5 py-2 font-medium text-white transition hover:bg-blue-700"
                        onClick={() => handleSubmit()}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body,
    );
};
