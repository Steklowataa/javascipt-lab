import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import '../style.css'

export default function LookFor() {
  const [inputCity, setInputCity] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handle = (e) => {
    setInputCity(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!inputCity.trim()) return;
    setInputCity("");
    navigate(`/search?city=${encodeURIComponent(inputCity)}`);
  };

  const isHomePage = location.pathname === "/";

  return (
    <div
      style={{
        backgroundImage: isHomePage ? 'linear-gradient(cyan, blue)' : 'none',
        backgroundSize: 'cover',
        height: '100vh', 
      }}
      className={`flex flex-col items-center w-full px-4 ${isHomePage ? "flex items-center justify-center" : "basis-1/3 pt-6"}`}
    >
      <div className={isHomePage ? "mt-[50px]" : ""}>
        <form
          className="lg:w-[400px] max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl sm:w-full sm:h-full"
          onSubmit={onSubmit}
        >
          <div className="relative w-full">
            <input
              className=" dark:bg-[rgba(217,217,217,0.7)] bg-white w-full h-12 md:h-12 pl-4 
              text-lg rounded-xl focus:ring-2 focus:ring-blue-500 placeholder-slate-700"
              type="text"
              onChange={handle}
              value={inputCity}
              placeholder="Enter city name"
            />
            <button
              type="submit"
              className="absolute right-4 top-1/2 transform -translate-y-1/2"
            >
              <img className="w-6 h-6 md:w-8 md:h-8" src="./icon/look-icon.png" alt="search" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
