"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _Weather_lat, _Weather_lon, _Weather_api;
Object.defineProperty(exports, "__esModule", { value: true });
const keys_1 = require("../keys");
const axios_1 = __importDefault(require("axios"));
class Weather {
    constructor(location) {
        _Weather_lat.set(this, void 0);
        _Weather_lon.set(this, void 0);
        _Weather_api.set(this, void 0);
        __classPrivateFieldSet(this, _Weather_lat, location.latitude, "f");
        __classPrivateFieldSet(this, _Weather_lon, location.longitude, "f");
        __classPrivateFieldSet(this, _Weather_api, `https://api.openweathermap.org/data/2.5/forecast?lat=${__classPrivateFieldGet(this, _Weather_lat, "f")}&lon=${__classPrivateFieldGet(this, _Weather_lon, "f")}&appid=${keys_1.apiKeys.openWeather}`, "f");
    }
    getWeather() {
        return __awaiter(this, void 0, void 0, function* () {
            let res = yield axios_1.default.get(__classPrivateFieldGet(this, _Weather_api, "f")).catch((e) => {
                console.log(`api: ${__classPrivateFieldGet(this, _Weather_api, "f")}`);
                console.log(`error: ${e.message}`);
            });
            return (res === null || res === void 0 ? void 0 : res.status) === 200 ? res.data : null;
        });
    }
    sortWeather(o) {
        //This generates a sorted object of arrays arranged by date and time.
        const res = {};
        const genObject = (i) => {
            return {
                date: i.dt * 1000,
                desc: i.weather[0].description,
                icon: i.weather[0].icon,
                feelsLike: i.main.feels_like,
                humidity: i.main.humidity,
                temp: i.main.temp,
                windStrength: i.wind.speed,
                windDirection: i.wind.deg,
            };
        };
        o.list.forEach((i) => {
            const date = new Date(i.dt * 1000); //Make a new date object
            const day = date.getDate(); //Get this dates date
            !res[day] ? (res[day] = []) : null; //Check to see if our object has a key for this iterations date. If not, create it.
            res[day].push(genObject(i)); //Push this iteration to the res object and ensure it goes in the correct nested array
        });
        return res;
    }
    get geo() {
        return { lat: __classPrivateFieldGet(this, _Weather_lat, "f"), lng: __classPrivateFieldGet(this, _Weather_lon, "f") };
    }
    set geo({ lat, lng }) {
        __classPrivateFieldSet(this, _Weather_lat, lat, "f");
        __classPrivateFieldSet(this, _Weather_lon, lng, "f");
        this.updateApi();
    }
    updateApi() {
        __classPrivateFieldSet(this, _Weather_api, `https://api.openweathermap.org/data/2.5/forecast?lat=${__classPrivateFieldGet(this, _Weather_lat, "f")}&lon=${__classPrivateFieldGet(this, _Weather_lon, "f")}&appid=${keys_1.apiKeys.openWeather}`, "f");
    }
}
_Weather_lat = new WeakMap(), _Weather_lon = new WeakMap(), _Weather_api = new WeakMap();
exports.default = Weather;
