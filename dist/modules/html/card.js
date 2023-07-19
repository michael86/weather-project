"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genCard = void 0;
const utils_js_1 = require("../utils.js");
function genCard(d) {
    return `
    <div class="card">
        <div class="card-body">
          <p class="time">${(0, utils_js_1.getLocaleTime)(d.date)}</p>
          <p>Temp: ${(0, utils_js_1.convertTempToCels)(d.temp)}<sup>o</sup></p>
          <p>Humidity: ${d.humidity}</p>
          <p class="description">${d.desc}
          <img src="https://openweathermap.org/img/wn/${d.icon}@2x.png" alt="Weather Icon" />
        </div>
    </div>`;
}
exports.genCard = genCard;
