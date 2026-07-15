import React from 'react'
import {useNavigate} from "react-router-dom"

export const LoginSignup = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-row justify-around w-fit gap-4">
      <button
        className="
    px-5 py-2.5
    bg-gray-300
    text-gray-900
    font-semibold
    rounded-xl
    border border-gray-200
    shadow-sm

    hover:bg-gray-200
    hover:shadow-md

    active:scale-95

    transition-all
    duration-200
    ease-in-out

    cursor-pointer
  "
  onClick={() => navigate("/login")}
      >
        Login
      </button>

      <button
        className="
    px-5 py-2.5
    bg-[#2563EB]
    text-white
    font-semibold
    rounded-xl
    shadow-sm

    hover:bg-[#1D4ED8]
    hover:shadow-md

    active:scale-95

    transition-all
    duration-200
    ease-in-out

    cursor-pointer
  "
  onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  )
}
