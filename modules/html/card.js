import { convertTempToCels, getLocaleTime } from "../utils.js";

export function genCard(d) {
  return `
    <div class="card">
        <div class="card-header">
          <div>
            <div class="time">
              <p>${getLocaleTime(d.date)}</p>
            </div>
            <div class="description">
              <p>${d.desc}
            </div>
          </div>
          <img src="https://openweathermap.org/img/wn/${
            d.icon
          }@2x.png" alt="Weather Icon" />
        </div>
        <div class="card-body">
          
          <p>Temp: ${convertTempToCels(d.temp)}<sup>o</sup></p>
          <p>Humidity: ${d.humidity}</p>

        </div>
    </div>`;
}
