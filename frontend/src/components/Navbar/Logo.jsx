import React from 'react'
import logo from "../../assets/Logo.png"

export const Logo = () => {
    return (
        <div className="flex flex-row gap-5 items-center hover:cursor-pointer hover:scale-101 transition-transform duration-200">
            <img src={logo} alt="Logo" className="h-15 w-15 md:h-21 md:w-21 rounded-2xl hover:scale-103 transition-transform duration-200" />
            <div>
                <p className="text-lg md:text-3xl">LabBook</p>
                <p>Research and experiment management platform</p>
            </div>
        </div>
    )
}
