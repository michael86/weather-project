"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSlider = void 0;
const utils_js_1 = require("../utils.js");
function createSlider(html, unix) {
    const id = (0, utils_js_1.genId)();
    const createArrow = (direction, path) => {
        return `<svg data-id="${id}" data-direction="${direction}" class="${direction}" viewBox="0 0 100 100"><path stroke-width="2" stroke-linecap="round" fill="#fff" stroke="#fff" d="${path}"/></svg>`;
    };
    return `
    <div class="slider-container" id="${id}">
        ${createArrow("scroll-left", "M98 98L2 50 98 2 98 5 8 50 98 95z")}
        <p class="date align-center">${(0, utils_js_1.getLocaleDate)(unix)}</p>
        <div class="card-container">
          ${html && html}
        </div>
        ${createArrow("scroll-right", "M2 2L98 50 2 98 2 95 92 50 2 5z")}
    </div>`;
}
exports.createSlider = createSlider;
