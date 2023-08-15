"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.commaDelimate = exports.genId = exports.convertTempToCels = exports.getLocaleDate = exports.getLocaleTime = void 0;
function getLocaleTime(unix) {
    const date = new Date(unix);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}
exports.getLocaleTime = getLocaleTime;
function getLocaleDate(unix) {
    const date = new Date(unix);
    return `${date.toLocaleDateString([], {
        weekday: "long",
    })} - ${date.toLocaleDateString()}`;
}
exports.getLocaleDate = getLocaleDate;
function convertTempToCels(temp) {
    return Math.round(temp - 273.15);
}
exports.convertTempToCels = convertTempToCels;
function genId() {
    return Math.floor(Math.random() * 1000);
}
exports.genId = genId;
function commaDelimate(n) {
    return n.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
exports.commaDelimate = commaDelimate;
function debounce(fn, d) {
    let timer;
    return function () {
        let context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(context, args);
        }, d);
    };
}
exports.debounce = debounce;
