import React from 'react';
import Element from './element';
import {data} from '../Components/data'



const Slider = () => {
  return (
    <div className='w-sreen h-auto  bg-white drop-shadow-md flex flex-row justify-between px-[122px] py-[1rem]'>
      {data.map((item, index) => (
        <Element 
          key={index} 
          img={item.img} 
          title={item.title} 
        />
      ))}
    </div>
  );
};

export default Slider;
