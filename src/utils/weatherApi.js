export const getWeather = ({ latitude, longitude, APIkey }) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
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
  if (condition.includes("rain")) return "rainy";
  if (condition.includes("snow")) return "snowy";
  if (condition.includes("clear")) return "sunny";
  return null; // fallback image will be used
};

const getWeatherType = (temperature) => {
  if (temperature > 86) return "hot";
  if (temperature >= 66) return "warm";
  return "cold";
};
