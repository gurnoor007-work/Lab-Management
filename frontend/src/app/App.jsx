import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

import { HomePage } from "../pages/HomePage";
import { Login } from "../pages/Login";
import { Signup } from "../pages/Signup";

import { AuthProvider } from "../context/AuthContext";
import { ExpDataProvider } from "../context/ExpDataContext";
import { ChemExpPage } from "../pages/Experiments/ChemExperiment/ChemExpPage";


function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route
                        path="/experiment/chemistry/:id"
                        element={
                            <ExpDataProvider>
                                <ChemExpPage />
                            </ExpDataProvider>
                        }
                    />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
