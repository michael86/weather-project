"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genHeaderContainer = exports.createLocationInfo = void 0;
const utils_js_1 = require("../utils.js");
function createLocationInfo(o) {
    const { country, name, population, sunrise, sunset } = o;
    const html = `<h2>${name} - ${country}</h2>
      <p>population: ${(0, utils_js_1.commaDelimate)(population)}</p>
      <p>Sunrise: ${(0, utils_js_1.getLocaleTime)(sunrise * 1000)}</p>
      <p>Sunset: ${(0, utils_js_1.getLocaleTime)(sunset * 1000)}</p>`;
    return genHeaderContainer(html);
}
exports.createLocationInfo = createLocationInfo;
function genHeaderContainer(html) {
    return `<div class="location-header" id="locHeader">${html} </div>`;
}
exports.genHeaderContainer = genHeaderContainer;
