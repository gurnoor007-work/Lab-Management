import React from 'react'

import { LoginSignup } from "../Navbar/LoginSignup"
import { Logo } from "../Navbar/Logo"

export const Navbar = () => {
  return (
    <div className="navbar sticky z-50 top-4 mx-auto w-[95%] rounded-3xl bg-[#F3F4F6] shadow-lg overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="logo-portion flex items-center gap-4">
          <Logo />
          <div className="h-15 w-0.5 bg-[#D1D5DB]"></div>
        </div>
        <div className="user-account">
          {/* <UserDisplay /> */}
          <LoginSignup />
        </div>
      </div>
    </div>
  )
}
