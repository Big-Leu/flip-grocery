"use client"
import React,{useState} from 'react';
import evv from '../images/chevron_right_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import Image from "next/image";
import ss from "../images/Vector1.svg"
import s2 from "../images/ac8550.webp"
import {menu} from "../Components/datamenu"
import DoubleMenu from '../Components/DoubleMenu';
const Element = ({img,title}) => {

  const [open, setOpen] = useState(false);
  const temp = true;
  return (
     <div className='w-auto h-auto flex flex-col bg-inherit  items-center'>
      <Image src={img}  className='object-cover mb-[.5rem] ' width={55} height={55} alt='product img'/>
      <div className='flex flex-row text-black hover:text-[#2370f4] transition-colors duration-300 space-x-2  relative'
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)} 
      >
          <label className='font-koulen mt-[.2rem]'>{title}</label>
          <Image 
            src={ss} 
            className={`filter brightness-0 hover:brightness-100  hover:rotate-90 ${open ?"rotate-90 brightness-100 ":"" }transform transition-transform duration-300 ease-in-out hover:scale-110`}
            alt="" 
          />
                {open && (
                  <div className=''>
                    <div className="absolute right-[-4rem] top-[2rem] h-4 w-28 -translate-x-1/2 -translate-y-1/2 rotate-0 " />
                    <DoubleMenu firstMenu={menu.firstMenu} options={menu.options}/>
                  </div>
            )}               
      </div>
     </div>
  );
};

export default Element;
