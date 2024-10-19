"use client"
import React, { useState } from 'react'
import './doublemenu.css'



function 
DoubleMenu({ firstMenu, options }) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [secondSelectedIndex, setSecondSelectedIndex] =useState(0);

    const changeIndex = (e)=>{
        setSelectedIndex(e.target.getAttribute("index"))
        setSecondSelectedIndex(0)
    }

    const changeSecondIndex = (e)=>{
        setSecondSelectedIndex(e.target.getAttribute("index"))
    }

    return (
        <div className='top-[.8rem] left-[-8rem] flex z-50 gap-3 p-5 max-w-fit m-5 justify-center items-center h-fit bg-white absolute drop-shadow-lg'>
            <div className='w-56 bg-white p-2 h-full self-start ' >
                {
                    firstMenu.map((element, index) => (
                        <div className={`options flex justify-between items-center  text-black ${index==selectedIndex?"selected-option":""}`} key={index} onMouseOver={changeIndex} index={index}>
                            {element}
                            <svg width="10" height="16" viewBox="0 0 16 27" xmlns="http://www.w3.org/2000/svg" className={`S4-WeF rotate-180 ${index!=selectedIndex?"hidden":""}`}>
                                <path d="M16 23.207L6.11 13.161 16 3.093 12.955 0 0 13.161l12.955 13.161z" fill="#2874f0" className="ZWDH2Y"></path>
                            </svg>
                        </div>
                    ))
                }
            </div>
            <div className='w-52 bg-white p-3 flex flex-col h-fit'>
                <span className='s-m-heading'>MORE IN {firstMenu[selectedIndex]?.toUpperCase()}</span>
                {options[selectedIndex] && options[selectedIndex].map((element, index) => (
                        <div className={`options flex justify-between ${index==secondSelectedIndex?"selected-option":""} text-black`} key={index} index={index} onMouseOver={changeSecondIndex}>
                            {element}
                        </div>
                ))}
            </div>
        </div>

    )
}

export default DoubleMenu