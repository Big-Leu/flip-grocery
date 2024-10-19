"use client";
import React, { useState, useEffect } from "react";
import VideoStream from "../Components/inventry"
import { NextPage } from "next";
import Navbar from "../Components/navabar";
const CAMP: NextPage = () => {
  
  return (
    <div className=" min-w-screen min-h-screen scrollbar-none">
        <Navbar/>
        <VideoStream/>
    </div>
);  
};

export default CAMP;
