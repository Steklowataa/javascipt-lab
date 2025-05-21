import { useEffect, useState } from "react";
import { text, getInfoWeather, changeBackground } from '../../utils';
import WeatherLoading from "./WeatherLoading";
import WeatherError from "./WeatherError";
import MainTemperature from "./MainTemperature";
import WeatherDetails from "./WeatherDetails";

export default function MainApp({ city, day1, setDay1, setForecastData }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function getWeather() {
    setLoading(true);
    setError(null);
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=4d8fb5b93d4af21d66a2948710284366&units=metric`;

    try {
      const response = await fetch(url1);
      if (!response.ok) {
        // <CustomAlert city={city}/>
        alert(`City ${city} doesn't found, try again!`);
      }

      const data1 = await response.json();
      const day1Data = {
        country: data1.city.country,
        temp: data1.list[0].main.temp,
        temp_max: data1.list[0].main.temp_max,
        temp_min: data1.list[0].main.temp_min,
        feels_like: data1.list[0].main.feels_like,
        humidity: data1.list[0].main.humidity,
        description: data1.list[0].weather[0].description,
        wind_speed: data1.list[0].wind.speed,
        visibility: data1.list[0].visibility
      };

      setDay1(day1Data);

      const forecastByDay = [];
      for (let i = 0; i < data1.list.length; i += 8) {
        const dayData = {
          date: data1.list[i].dt_txt,
          temp: data1.list[i].main.temp,
          description: data1.list[i].weather[0].description
        };
        forecastByDay.push(dayData);
      }

      changeBackground(day1Data.description);
      setForecastData(forecastByDay);

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (city) {
      getWeather();
    }
  }, [city]);


  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {loading && <WeatherLoading />}
      {error && <WeatherError error={error}/>}
      {day1 ? (
        <>
          {/* Główna temperatura */}
          <MainTemperature temp={day1.temp} description={day1.description}/>
          {/* Szczegóły pogody */}
          <WeatherDetails 
            feels_like={day1.feels_like} 
            visibility={day1.visibility}
            humidity={day1.humidity} 
            wind_speed={day1.wind_speed}/>
        </>
      ) : (
        <p className="text-gray-500">No weather data available.</p>
      )}
    </div>
  );
}
