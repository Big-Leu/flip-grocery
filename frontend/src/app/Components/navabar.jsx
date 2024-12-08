"use client"
import React,{useState} from 'react';
import evv from '../images/chevron_right_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import vv from '../images/right1.svg'
import Image from "next/image";
import Menu from './menu';
import Link from 'next/link';
const Navbar = () => {
  const temp = true
  const [open, setOpen] = useState(false);
  return (
    <nav className="bg-green-600 text-white">
      <div className=" relative flex flex-row justify-items-stretch px-[10%] min-h-[3.3rem]" >
        <Link href="/">
          <div className=' h-full items-center flex'>  
            <h1 className="text-xl font-bold italic">Grocery </h1>
          </div>
        </Link>
        <div className=" relative min-w-[40%]  flex items-center ">
            <input 
              className="pl-10 pr-4 mx-2 mt-1 min-w-full min-h-[2rem] text-black drop-shadow-2xl rounded-sm focus:outline-none" 
              type="text" 
              id="search-grocery" 
              placeholder="Search grocery products" 
            />
            <svg 
              className="absolute top-[35%] right-0 "
              width="20" 
              height="20" 
              viewBox="0 0 17 18" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="#16A34A" fillRule="evenodd">
                <path d="M11.618 9.897l4.225 4.212c.092.092.101.232.02.313l-1.465 1.46c-.081.081-.221.072-.314-.02l-4.216-4.203"></path>
                <path d="M6.486 10.901c-2.42 0-4.381-1.956-4.381-4.368 0-2.413 1.961-4.369 4.381-4.369 2.42 0 4.381 1.956 4.381 4.369 0 2.413-1.961 4.368-4.381 4.368m0-10.835c-3.582 0-6.486 2.895-6.486 6.467 0 3.572 2.904 6.467 6.486 6.467 3.582 0 6.486-2.895 6.486-6.467 0-3.572-2.904-6.467-6.486-6.467"></path>
              </g>
            </svg>
        </div>
        <div className='flex flex-row items-center space-x-[10%] px-[2%] ml-[2%] min-w-[60%]'>
          <div className='flex space-x-1 font-bold'>
            <div className='mt-1'>
              <svg width="12" height="16" viewBox="0 0 9 12" xmlns="http://www.w3.org/2000/svg"><path fill="#FFFFFF" d="M4.2 5.7c-.828 0-1.5-.672-1.5-1.5 0-.398.158-.78.44-1.06.28-.282.662-.44 1.06-.44.828 0 1.5.672 1.5 1.5 0 .398-.158.78-.44 1.06-.28.282-.662.44-1.06.44zm0-5.7C1.88 0 0 1.88 0 4.2 0 7.35 4.2 12 4.2 12s4.2-4.65 4.2-7.8C8.4 1.88 6.52 0 4.2 0z" fillRule="evenodd"></path></svg>
            </div>
            
            <label>Delivery to 781015</label>
            <div className='-rotate-90  hover:rotate-90 transform transition-transform duration-300 ease-in-out'>
                <Image  src={evv} alt="" />
            </div>
          </div>
          <div className='flex space-x-1 font-bold'>      
            <label>UserProfile</label>
            <div className='-rotate-90  hover:rotate-90 transform transition-transform duration-300 ease-in-out'>
              <Image  src={evv} alt="" />
            </div>
          </div>
          <div className='relative flex space-x-1 font-bold'
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)} 
          >       
            <label>More</label>
            <div className='-rotate-90  hover:rotate-90 transform transition-transform duration-300 ease-in-out'>
                <Image  src={evv} alt="" />
            </div>
                {open && (
                  <div className=''>
                    <div className="absolute top-1 left-0 right-0 h-6 bg-transparent" />
                    <div className="absolute left-1/2 top-[2rem] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
                    <Menu/>
                  </div>
            )}
          </div>
          <div className='flex space-x-2 font-bold'>       
            <div className='mt-[.3rem]'>
                <Image  src={vv} alt="" />
            </div>
            <label>Cart</label>
          </div>
        </div>
        <div className=' absolute right-0 max-h-full bg-green-700'>
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fk_goto_home_logo_small_5b9cdd.svg" alt="Flipkart" title="Flipkart" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
