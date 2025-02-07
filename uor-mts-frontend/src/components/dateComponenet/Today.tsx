import React from 'react'

export default function Today() {
    const today = new Date().toDateString();
  return (
    <div>
       <p className="text-[12px] text-[#611010] font-normal relative left-8 -top-16">{today}</p>
    </div>
  )
}
