import React from "react";
import { getInfoWeather } from "../../utils";

const MainTemperature = ({ temp, description }) => {
    return (
      <div className="flex flex-col items-center justify-start lg:mb-[150px] mt-[80px]"> 
        <h1 className="lg:text-[90px] text-[60px] font-semibold dark:text-white font-kochinoor">
          {Math.round(temp)}°C
        </h1>
        <p className="lg:text-[16px] text-[14px] text-black dark:text-white font-kochinoor lg:ml-[20px] 
        lg:mr-[20px] mt-[30px] text-center">
          {getInfoWeather(description)}
        </p>
      </div>
    );
  };
  
  export default MainTemperature;
  