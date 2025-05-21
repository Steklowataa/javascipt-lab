import { capitalize, text } from "../../utils";
import { getTodaysDate } from "../../utils/getTodaysDate";
import "../../style.css";

export default function Mainscreen({ day1, city }) {
    if (!day1) return null;
    const min = Math.round(day1.temp_min)
    const max = Math.round(day1.temp_max)
    const avg = max + min / 2
  
    return (
      <div className="flex flex-col items-center lg:items-start text-center lg:text-start w-full lg:mt-[110px] font-kochinoor ml-[20px]">
        <h1 className="text-2xl lg:text-[60px] font-semibold dark:text-white mb-[10px]">
          {capitalize(day1.description)}
        </h1>
        <p className="text-sm lg:text-lg font-semibold mt-2 dark:text-white">
          <span>{day1?.country}, </span>
          <span>{capitalize(city)}, </span>
          <span>{getTodaysDate()}</span>
        </p>
  
        <div className="text-sm lg:text-[16px] mt-4 dark:text-white font-kochinoor">
          <p>
            {text["common-info-max"]} {min}°C,{" "}
            {text["common-info-min"]} {max}°C.{" "}
            </p>
            <p>
            {text["common-info-average"]} {avg}
            </p>
        </div>
      </div>
    );
  }
