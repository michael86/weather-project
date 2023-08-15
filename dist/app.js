"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const weather_js_1 = __importDefault(require("./modules/weather.js"));
const location_js_1 = __importDefault(require("./modules/location.js"));
const maps_js_1 = __importDefault(require("./modules/maps.js"));
const h = __importStar(require("./modules/html/htmlGenerator.js"));
const utils_js_1 = require("./modules/utils.js");
const schema_js_1 = require("./schemas/schema.js");
const locationInput = document.getElementById("locationInput");
const locHeader = document.getElementById("locHeaderContainer");
const root = document.getElementById("root");
let _weather, _map;
const showGeoLocation = () => {
    navigator.geolocation.getCurrentPosition((pos) => __awaiter(void 0, void 0, void 0, function* () {
        root.innerHTML = h.genLoader();
        _weather = new weather_js_1.default(pos.coords);
        _map = new maps_js_1.default(pos.coords);
        manipulateDom({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    }));
};
const handleInput = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    genLoading();
    const data = new FormData(locationInput);
    const location = data.get("location");
    location.trim();
    const validate = schema_js_1.userSchema.validate({ location });
    const er = validate.error;
    er && invalidInput();
    !er && location.length === 0 && showGeoLocation(); //If input field empty, show current location
    const locationData = !er && location.length > 0 && (yield location_js_1.default.convertLocation(location)); //convert location
    !er && !locationData && genResults(); //Couldn't find location so meme time
    if (locationData) {
        _weather.geo = locationData;
        manipulateDom(locationData);
    }
});
const inputHandler = (0, utils_js_1.debounce)(handleInput, 1000);
locationInput.addEventListener("input", inputHandler);
locationInput.addEventListener("submit", (e) => e.preventDefault()); //because debounce breaks form submission
const addEventListeners = () => {
    const containers = document.getElementsByClassName("slider-container");
    for (const i of containers) {
        i.addEventListener("click", (e) => {
            const { dataset } = e.target;
            dataset.direction && scrollSlider(e.target);
        });
    }
};
const scrollSlider = (target) => {
    const { id, direction } = target.dataset;
    //The following 3 lines get all of the elements we require to transition the slider left and right
    //along with the width of a card so we can scroll left or right the required amount of px.
    const slider = document.getElementById(id);
    const cardContainer = slider.querySelector(".card-container");
    const width = cardContainer.querySelector(".card").clientWidth;
    direction.includes("left")
        ? (cardContainer.scrollLeft -= width)
        : (cardContainer.scrollLeft += width);
};
const manipulateDom = ({ lat, lon }) => __awaiter(void 0, void 0, void 0, function* () {
    const o = yield _weather.getWeather();
    locHeader.innerHTML = h.genHeader(o.city);
    genResults(_weather.sortWeather(o));
    _map.updateLocation(lat, lon);
    _map.showMap();
    addEventListeners();
});
const genResults = (data) => {
    if (data) {
        root.innerHTML = "";
        for (const d in data)
            if (data[d] && data[d][0]) {
                root.innerHTML += h.genSlider(h.genCards(data[d]), data[d][0].date);
            }
        return;
    }
    root.innerHTML = h.genMeme("not found");
    locHeader.innerHTML = h.locNotFound();
};
const genLoading = () => {
    locHeader.innerHTML = "";
    _map.hideMap();
    root.innerHTML = h.genLoader();
};
const invalidInput = () => {
    root.innerHTML = h.genMeme("invalid");
    locHeader.innerHTML = h.invalidChars();
};
showGeoLocation();
