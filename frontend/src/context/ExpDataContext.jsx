import React, { Children } from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import API from "../api";

const ExpDataContext = createContext();

export const ExpDataProvider = ({ children }) => {
    const [expData, setExpData] = useState({});
    const [notFound, setNotFound] = useState(false);
    const [forbidden, setForbidden] = useState(false);
    const [loading, setLoading] = useState(true);

    const { id } = useParams();

    const getExperiment = async () => {
        setNotFound(false);
        setForbidden(false);
        setLoading(true);

        try {
            const resp = await API.get(`api/experiments/chemistry/get/${id}`);
            if (resp.status === 200) {
                setExpData(resp.data.data);
                return;
            }
        } catch (err) {
            if (err.response?.status === 404) {
                setNotFound(true);
                return;
            }
            if (err.response?.status === 403) {
                setForbidden(true);
                return;
            } else {
                console.log("internal server error while retrieving experiment");
                return;
            }
        } finally {
            setLoading(false);
        }
    };

    function formatDateTime(dateString) {
        const date = new Date(dateString);

        return date.toLocaleString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        });
    }

    useEffect(() => {
        getExperiment();
        console.log("getting data");
    }, [id]);
    return (
        <ExpDataContext.Provider
            value={{
                getExperiment,
                formatDateTime,
                expData,
                setExpData,
                notFound,
                forbidden,
                loading,
            }}
        >
            {children}
        </ExpDataContext.Provider>
    );
};

export const useExpData = () => useContext(ExpDataContext);
