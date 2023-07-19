"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidChars = exports.locNotFound = exports.genLoader = exports.genMeme = exports.genHeader = exports.genCards = exports.genSlider = void 0;
const errors_js_1 = require("./errors.js");
const sliders_js_1 = require("./sliders.js");
const card_js_1 = require("./card.js");
const static_js_1 = require("./static.js");
function genSlider(html, unix) {
    return (0, sliders_js_1.createSlider)(html, unix);
}
exports.genSlider = genSlider;
function genCards(data) {
    let cards = "";
    for (const i in data) {
        cards += (0, card_js_1.genCard)(data[i]);
    }
    return cards;
}
exports.genCards = genCards;
function genHeader(o) {
    return (0, static_js_1.createLocationInfo)(o);
}
exports.genHeader = genHeader;
function genMeme(e) {
    return (0, errors_js_1.getMeme)(e);
}
exports.genMeme = genMeme;
function genLoader() {
    return `<div class="loader-container align-center"><div class="lds-ring"><div></div><div></div><div></div><div></div></div></div>`;
}
exports.genLoader = genLoader;
function locNotFound() {
    return (0, errors_js_1.invalidLoc)();
}
exports.locNotFound = locNotFound;
function invalidChars() {
    return (0, errors_js_1.invalidChar)();
}
exports.invalidChars = invalidChars;
