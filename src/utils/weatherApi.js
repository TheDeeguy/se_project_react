export const getWeather = ({ latitude, longitude, apiKey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  });
};

export const filterWeatherData = (data) => {
  const result = {};

  result.city = data.name;

  // Temperature
  result.temp = { F: data.main.temp };

  // hot / warm / cold
  result.type = getWeatherType(result.temp.F);

  // Normalize condition so it matches constants.js
  result.condition = normalizeCondition(data.weather[0].main.toLowerCase());

  // Boolean: true = day, false = night
  result.isDay = isDay(data.sys, Date.now());

  return result;
};

// Determines whether it is day or night
const isDay = ({ sunrise, sunset }, now) => {
  return sunrise * 1000 < now && now < sunset * 1000;
};

// Maps OpenWeather values → app values
const normalizeCondition = (condition) => {
  if (condition.includes("cloud")) return "cloudy";
  if (condition.includes("rain")) return "rain";
  if (condition.includes("snow")) return "snow";
  if (condition.includes("clear")) return "clear";
  if (condition.includes("fog")) return "fog";
  return null; // fallback image will be used
};

const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
