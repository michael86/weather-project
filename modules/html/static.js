import { commaDelimate, getLocaleTime } from "../utils.js";

export function createLocationInfo(o) {
  const { country, name, population, sunrise, sunset } = o;
  return `
    <h2>${name} - ${country}</h2>
    <p>population: ${commaDelimate(population)}</p>
    <p>Sunrise: ${getLocaleTime(sunrise * 1000)}</p>
    <p>Sunset: ${getLocaleTime(sunset * 1000)}</p>
  `;
}
