import React from 'react';
import evv from '../images/chevron_right_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg'
import Image from "next/image";
import ss from "../images/Vector1.svg"
import s2 from "../images/ac8550.webp"
const data = [
    { name: "Aashirvaad Flour", img: "https://www.jiomart.com/images/product/original/490000041/aashirvaad-shudh-chakki-atta-10-kg-product-images-o490000041-p490000041-0-202401260851.jpg?im=Resize=(420,420)", offer: "Up to 60% OFF" },
    { name: "Oil", img: "https://m.media-amazon.com/images/I/61Jb7TOqaeL.jpg", offer: "Up to 25% OFF" },
    { name: "Masala & Spices", img: "https://www.jiomart.com/images/product/original/490000041/aashirvaad-shudh-chakki-atta-10-kg-product-images-o490000041-p490000041-0-202401260851.jpg?im=Resize=(420,420)", offer: "20% OFF" },
  ]

const Element = ({img,title}) => {
  return (
     <div className='w-auto h-auto flex flex-col bg-inherit  items-center'>
      <Image src={img}  className='object-cover mb-[.5rem] ' width={55} height={55} alt='product img'/>
      <div className='flex flex-row text-black hover:text-[#2370f4] transition-colors duration-300 space-x-2'>
          <label className='font-koulen mt-[.2rem]'>{title}</label>
          <Image 
            src={ss} 
            className='filter brightness-0 hover:brightness-100  hover:rotate-90 transform transition-transform duration-300 ease-in-out hover:scale-110' 
            alt="" 
          />
      </div>
     </div>
  );
};

export default Element;
