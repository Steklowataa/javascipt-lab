import '../../App.css'
import { capitalize, getWeatherIcon} from '../../utils';


export default function Forecast({ day1, forecastData }) {
  if (!day1) {
    return <p></p>; 
  }
  return (
    <div className='w-full mt-8 lg:mt-[320px]'>
      <h2 className='font-kochinoor font-extralight text-white text-[18px] pb-[10px]'>Forecast for week</h2>
      <div className='flex flex-wrap  justify-center lg:justify-start gap-2'>
      {forecastData.map((item, index) => (
        <div
        key={index}
        className="text-center w-[170px] flex flex-col items-center justify-between mr-[5px] h-[270px] rounded-[12px] bg-[rgba(217,217,217,0.4)]
         text-white dark:bg-[rgba(128,146,208,0.7)]
         transition-transform duration-300 hover:scale-110"
      >
        <p className="font-kochinoor mt-[10px] text-[16px]">{capitalize(item.description)}</p>
        <div className="flex flex-1 items-center justify-center">
          <img className="h-[100px] w-[100px] -mt-[2px]" src={getWeatherIcon(item.description)} alt="Weather icon" />
        </div>
        <div className="flex flex-col items-center justify-end mt-auto mb-[10px]">
          <div className="font-kochinoor text-[40px]">{Math.round(item.temp)}°C</div>
          <div className="font-kochinoor text-[18px]">
            {new Date(item.date).toLocaleDateString('en-US', { weekday: 'long' })}
          </div>
        </div>
      </div>
      ))}
      </div>
     
    </div>
  );
}
