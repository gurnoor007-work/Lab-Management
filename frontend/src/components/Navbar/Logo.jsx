import React from 'react'
import logo from "../../assets/Logo.png"

export const Logo = () => {
    return (
        <div className="flex flex-row gap-5 items-center">
            <img src={logo} alt="Logo" className="h-15 w-15 md:h-21 md:w-21 rounded-2xl" />
            <p className="text-lg md:text-3xl">Lab Management</p>
        </div>
    )
}
