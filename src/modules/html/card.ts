import { convertTempToCels, getLocaleTime } from "../utils.js";

interface D {
  date: number;
  desc: string;
  feelsLike: number;
  humidity: number;
  icon: string;
  temp: number;
  windDirection: number;
  windStrength: number;
}

export function genCard(d: D) {
  return `
    <div class="card">
        <div class="card-body">
          <p class="time">${getLocaleTime(d.date)}</p>
          <p>Temp: ${convertTempToCels(d.temp)}<sup>o</sup></p>
          <p>Humidity: ${d.humidity}</p>
          <p class="description">${d.desc}
          <img src="https://openweathermap.org/img/wn/${
            d.icon
          }@2x.png" alt="Weather Icon" />
        </div>
    </div>`;
}
