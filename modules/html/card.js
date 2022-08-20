import { convertTempToCels, getLocaleTime } from "../utils.js";

export function genCard(d) {
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
