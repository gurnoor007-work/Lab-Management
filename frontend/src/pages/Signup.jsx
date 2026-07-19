import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export const Signup = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);
    const { signup, signupErrors, clearSignupError } = useAuth();

    return (
        <div className="h-screen flex items-center justify-center">
            <div className="signup-area flex flex-col w-[25%] gap-10">
                <div>
                    <p className="text-[#111827] font-semibold text-5xl">Create account.</p>
                    <hr className="border-[#D1D5DB] my-2" />
                </div>
                <div className="input-boxes flex flex-col gap-3">
                    <div className="signup-email flex flex-col">
                        <label htmlFor="email" className="text-md font-medium text-gray-700 mb-0.5">
                            Email Address
                        </label>

                        <div className="relative flex flex-row gap-4 items-center">
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    clearSignupError("email");
                                }}
                                placeholder="example@gmail.com"
                                className={`
                                            w-full
                                            rounded-lg
                                            px-4 py-3
                                            text-gray-900
                                            placeholder:text-gray-400
                                            outline-none
                                            transition
                                            focus:border-blue-500
                                            focus:ring-2
                                            focus:ring-blue-200
                                          ${signupErrors.email ? "border border-red-500" : "border border-gray-300"}`}
                            />
                            {signupErrors.email && (
                                <div className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-red-500 px-3 py-2 text-sm text-white shadow-md">
                                    {signupErrors.email[0]}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="signup-username">
                        <label
                            htmlFor="username"
                            className="text-md font-medium text-gray-700 mb-0.5"
                        >
                            Username
                        </label>

                        <div className="relative flex flex-row gap-4 items-center">
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                    clearSignupError("username");
                                }}
                                placeholder="albert-einstein"
                                className={`
                                                w-full
                                                rounded-lg
                                                px-4 py-3
                                                text-gray-900
                                                placeholder:text-gray-400
                                                outline-none
                                                transition
                                                focus:border-blue-500
                                                focus:ring-2
                                                focus:ring-blue-200
                                              ${signupErrors.email ? "border border-red-500" : "border border-gray-300"}`}
                            />
                            {signupErrors.username && (
                                <div className="absolute left-full ml-3 whitespace-nowrap rounded-md bg-red-500 px-3 py-2 text-sm text-white shadow-md">
                                    {signupErrors.username[0]}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="signup-password">
                        <label
                            htmlFor="password"
                            className="text-md font-medium text-gray-700 mb-0.5"
                        >
                            Password
                        </label>

                        <div className="password relative">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="************"
                                className="
                                          w-full
                                          rounded-lg
                                          border border-gray-300
                                          px-4 py-3
                                          text-gray-900
                                          placeholder:text-gray-400
                                          outline-none
                                          transition
                                          focus:border-blue-500
                                          focus:ring-2
                                          focus:ring-blue-200
                                        "
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="
                                          absolute
                                          right-3
                                          top-1/2
                                          -translate-y-1/2
                                          text-gray-500
                                          hover:cursor-pointer
                                          hover:scale-105
                                          transition-transform
                                          duration-200
                                        "
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="submit-button flex justify-center">
                    <button
                        className="bg-[#2563EB] text-white text-xl font-semibold rounded-lg px-6 py-4 hover:bg-[#1D4ED8] hover:cursor-pointer hover:shadow-lg hover:scale-102 transition-all duration-300"
                        onClick={async () => await signup(email, username, password)}
                    >
                        Signup
                    </button>
                </div>
            </div>
        </div>
    );
};
