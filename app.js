import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherForm from './components/WeatherForm';
import WeatherCard from './components/WeatherCard';
import './styles.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = 'your_openweathermap_api_key';

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching the weather data', error);
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByCoords(latitude, longitude);
      },
      (error) => {
        console.error('Error fetching the geolocation', error);
      }
    );
  }, []);

  return (
    <div className="app">
      <h1>Weather Forecast</h1>
      <WeatherForm fetchWeather={fetchWeather} />
      <WeatherCard weatherData={weatherData} />
    </div>
  );
};

export default App;
