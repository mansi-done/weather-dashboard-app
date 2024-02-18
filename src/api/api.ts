import axios from "axios";

const geoDbApiKey = process.env.REACT_APP_GEODB_API_KEY || "";
const openweathermapApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY || "";
const geoDbHost = process.env.REACT_APP_GEODB_HOST || "";

export const genGeoDBConfig = (input: any) => {
  const geoDBCities = {
    method: "GET",
    url: "https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions",
    params: {
      namePrefix: input,
    },
    headers: {
      "X-RapidAPI-Key": geoDbApiKey,
      "X-RapidAPI-Host": geoDbHost,
    },
  };

  return geoDBCities;
};

export const genOpenWeatherAPI = (lat: number, lon: number) => {
  const weatherAPI = {
    method: "GET",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      lat: lat,
      lon: lon,
      appid: openweathermapApiKey,
      units: "metric",
    },
  };
  return weatherAPI;
};
