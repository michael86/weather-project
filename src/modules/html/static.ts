import { commaDelimate, getLocaleTime } from "../utils.js";

interface CreateLocationInfo {
  coord: { lat: number; lon: number };
  country: string;
  id: number;
  name: string;
  population: string;
  sunrise: number;
  sunset: number;
  timezone: number;
}

export function createLocationInfo(o: CreateLocationInfo) {
  const { country, name, population, sunrise, sunset } = o;

  const html = `<h2>${name} - ${country}</h2>
      <p>population: ${commaDelimate(population)}</p>
      <p>Sunrise: ${getLocaleTime(sunrise * 1000)}</p>
      <p>Sunset: ${getLocaleTime(sunset * 1000)}</p>`;

  return genHeaderContainer(html);
}

export function genHeaderContainer(html: string) {
  return `<div class="location-header" id="locHeader">${html} </div>`;
}
