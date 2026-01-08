import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  if (!weatherData) return null;

  const isDay = Boolean(weatherData.isDay);
  const condition = weatherData.condition?.toLowerCase();

  const weatherOption = weatherOptions.find(
    (option) => option.day === isDay && option.condition === condition
  );

  // 🔑 fallback logic
  const imageUrl = weatherOption
    ? weatherOption.url
    : isDay
    ? defaultWeatherOptions.day.url
    : defaultWeatherOptions.night.url;

  const altText = weatherOption
    ? `Weather showing ${isDay ? "day" : "night"} ${condition}`
    : `Default ${isDay ? "day" : "night"} weather image`;

  return (
    <section className="weather-card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>

      <img src={imageUrl} alt={altText} className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
