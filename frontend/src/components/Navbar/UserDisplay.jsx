import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

export const UserDisplay = () => {
    const { user, logout } = useAuth();

    const username = user?.user_data?.username ?? "";
    const email = user?.user_data?.email ?? "";

    const [open, setOpen] = useState(false);

    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)){
                setOpen(false);
            }
        }
        
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div ref={containerRef} className="relative inline-block">
            <div
                className="flex items-center gap-3 rounded-2xl px-4 py-2 hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                onClick={() => setOpen((prev) => !prev)}
            >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white font-semibold uppercase">
                    {username.charAt(0)}
                </div>
                <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-gray-900 truncate">{username}</span>
                    <span className="text-xs text-gray-500 truncate">{email}</span>
                </div>
            </div>
            {open && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2">
                    <button
                        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg cursor-pointer"
                        onClick={async () => await logout()}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};
