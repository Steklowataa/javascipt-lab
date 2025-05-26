import React from "react";
import { text } from "../../utils";
import '../../../src/style.css'


const WeatherDetails = ({ feels_like, visibility, humidity, wind_speed }) => {
  return (
    <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-4 w-full max-w-[400px] mb-[80px] sm:text-center">
      <div className="flex flex-col items-start block-text ">
        <div className="flex flex-row items-center">
        <img className="icon-temp" src="./icon/weatherDetails/icon-temp.png" alt="Weather icon temperature" />
        <span className="main-text">{text['feels']}</span>
        </div>
        <div className="middle-text">{Math.round(feels_like)}°C</div>
      </div>
      <div className="flex flex-col items-start block-text">
      <div className="flex flex-row items-center">
        <img className="icon-temp" src="./icon/weatherDetails/icon-vis.png" alt="Weather icon visibility" />
        <span className="main-text" >{text['visibility']}</span>
        </div>
        <div className="middle-text">{Math.round(visibility / 1000)} km</div>
      </div>
      <div className="flex flex-col items-start block-text">
      <div className="flex flex-row items-center">
        <img className="icon-temp" src="./icon/weatherDetails/icon-vis.png" alt="Weather icon humidity" />
        <span className="main-text">{text['humidity']}</span>
    </div>
        <div className="middle-text">{humidity}%</div>
      </div>
      <div className="flex flex-col items-start block-text">
      <div className="flex flex-row items-center">
        <img className="icon-temp" src="./icon/weatherDetails/icon-wind.png" alt="Weather icon wind speed" />
        <span className="main-text">{text['wind-speed']}</span>
        </div>
        <div className="items-center flex">
        <div className="middle-text">{wind_speed} m/s</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDetails;
