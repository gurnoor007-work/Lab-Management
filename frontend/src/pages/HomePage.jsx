import React from "react";
import { Navbar } from "../components/Navbar/Navbar";
import {Header} from "../components/Header/Header"

export const HomePage = () => {
    return (
        <div className="min-h-screen px-15">
            <div className="navbar flex justify-center py-4">
                <Navbar />
            </div>
            <div className="header-carrier">
                <Header />
            </div>
        </div>
    );
};
