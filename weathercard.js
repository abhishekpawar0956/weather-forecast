import React from 'react';

const WeatherCard = ({ weatherData }) => {
  if (!weatherData) return null;

  const { city, list } = weatherData;
  return (
    <div className="weather-card">
      <h2>{city.name}, {city.country}</h2>
      <div className="weather-forecast">
        {list.slice(0, 5).map((weather, index) => (
          <div key={index} className="weather-day">
            <p>{new Date(weather.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {weather.main.temp}°C</p>
            <p>{weather.weather[0].description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherCard;
