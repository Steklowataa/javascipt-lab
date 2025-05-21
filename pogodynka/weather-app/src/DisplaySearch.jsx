import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import LookFor from "./Components/LookFor";
import Mainscreen from "./Components/MainScreen/Mainscreen";
// import Forecast from "./Components/Forecast/Forecast";
import MainApp from './Components/MainApp/MainApp'
import { lazy, Suspense } from "react";
import Loading from "./Components/Loading";
import DarkModeButton from "./Components/DarkModeButton";

const Forecast = lazy(() => import("./Components/Forecast/Forecast"))

export default function DisplaySearch() {
  // ... existing state code ...
  const [city, setCity] = useState(""); 
  const [day1, setDay1] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityFromUrl = params.get("city");
    if (cityFromUrl) setCity(cityFromUrl);
  }, [location]);

 
  return (
    
    <div className="relative flex flex-col lg:flex-row min-h-screen">
    {/* Przycisk zmiany trybu */}
    <div className="absolute top-4 right-4 z-50">
      <DarkModeButton />
    </div>

    <div className="flex flex-col items-center w-full lg:w-1/3 p-4 bg-[rgba(217,217,217,0.2)] bg-cover bg-center rounded-[24px]">
      <LookFor />
      <MainApp 
        day1={day1} 
        city={city} 
        setDay1={setDay1} 
        setForecastData={setForecastData}
      />
    </div>

    <div className="flex flex-col w-full lg:w-2/3 p-4">
      <Mainscreen day1={day1} city={city} />
      <Suspense fallback={<Loading />}>
        <Forecast day1={day1} forecastData={forecastData} />
      </Suspense>
    </div>
  </div>
  );
}