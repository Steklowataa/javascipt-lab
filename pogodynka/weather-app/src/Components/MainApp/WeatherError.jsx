import React from "react";

const WeatherError = ({ error }) => {
  return <p className="text-red-500">Error: {error}</p>;
};

export default WeatherError;
