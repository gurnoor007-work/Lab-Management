import React from "react";
import { useState, useEffect, createContext, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import API from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [loggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    const [signupErrors, setSignupErrors] = useState({});
    const [loginError, setLoginError] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    // signup function
    const signup = async (email, username, password) => {
        try {
            const resp = await API.post("api/users/register/", { email, username, password });
            if (resp.status === 201) {
                setIsLoggedIn(true);
                await fetchUser();
                navigate(-1);
                console.log({ message: "Signup Successful" });
            }
        } catch (err) {
            if (err.response?.status === 400) {
                setSignupErrors(err.response.data);
            }
            if (err.response.status === 500) {
                alert("Server error. Please try again later.");
            }
        }
    };
    const clearSignupError = (field) => {
        setSignupErrors((prev) => {
            const copy = { ...prev };
            delete copy[field];
            return copy;
        });
    };

    // login function
    const login = async (email, password) => {
        try {
            const resp = await API.post("api/users/login/", { email, password });
            if (resp.status === 200) {
                setIsLoggedIn(true);
                await fetchUser();
                navigate("/");
                console.log({ message: "Login Successful" });
            }
        } catch (err) {
            const error = err.response?.data;
            if (err.response?.status === 401) {
                if (error.message === "Invalid email or password") {
                    setLoginError(true);
                }
            }
        }
    };
    const clearLoginError = () => {
        setLoginError((prev) => {
            if (prev) {
                return !prev;
            }
        });
    };

    // logout function
    const logout = async () => {
        try {
            const resp = await API.post("api/users/logout/");
            if (resp.status === 200) {
                setIsLoggedIn(false);
                setUser(null);
                console.log({ message: "Logout Successful" });
            }
        } catch (err) {
            console.log({
                message: "Logout failed",
                error: err.response?.data || "And error occured",
            });
        }
    };

    // token refresh
    const tokenRefresh = async () => {
        try {
            const resp = await API.post("api/users/refresh/");
            if (resp.status === 200) {
                setIsLoggedIn(true);
                await fetchUser();
                console.log("Token refresh successful");
                return true;
            }
        } catch (err) {
            console.log({
                message: "Token refresh failed",
                error: err.response?.data || "An error occured",
            });
            return false;
        }
    };

    // get user
    const fetchUser = async () => {
        try {
            const resp = await API.get("api/users/fetch-user/");
            if (resp.status === 200 && resp.data) {
                setUser(resp.data);
                setIsLoggedIn(true);
                console.log("user: ", user);
            }
        } catch {
            console.log({ message: "Fetch user failed" });
            await logout();
        }
    };

    // get authenticated
    const getAuthenticated = async () => {
        try {
            const resp = await API.post("api/users/is-authenticated/");
            if (resp.status === 200) {
                await fetchUser();
                return;
            }
        } catch (err) {
            if (err.response?.status === 401) {
                console.log({ message: "Token refresh required, initiating..." });
                const refresh_status = await tokenRefresh();
                if (refresh_status) {
                    console.log("Token refresh successful");
                } else {
                    setIsLoggedIn(false);
                    setUser(null);
                }
            }
        }
    };

    // Run the getAuthenticated function everytime the url changes
    useEffect(() => {
        getAuthenticated();
    }, [location.pathname]);

    return (
        <AuthContext.Provider
            value={{
                signup,
                loggedIn,
                user,
                setUser,
                login,
                logout,
                fetchUser,
                getAuthenticated,
                signupErrors,
                clearSignupError,
                loginError,
                clearLoginError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
