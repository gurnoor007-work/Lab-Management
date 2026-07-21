import React from 'react'
import {EllipsisVertical} from "lucide-react"

export const HeaderOtherOptions = () => {
  return (
    <div className="button">
            <button className="px-3 py-2 bg-[#F3F4F6] border border-[#E5E7EB] rounded-lg hover:scale-101 transition-transform duration-200 hover:cursor-pointer hover:bg-[#f1f1f1]">
                <EllipsisVertical />
            </button>
        </div>
  )
}
