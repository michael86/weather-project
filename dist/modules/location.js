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
Object.defineProperty(exports, "__esModule", { value: true });
const keys_js_1 = require("../keys.js");
class Location {
    static convertLocation(location) {
        return __awaiter(this, void 0, void 0, function* () {
            location = location.toLowerCase();
            const callApi = (l) => __awaiter(this, void 0, void 0, function* () {
                return axios.get(`https://api.geoapify.com/v1/geocode/search?text=${l}&lang=en&limit=10&type=city&format=json&apiKey=${keys_js_1.apiKeys.geoapify}`);
            });
            //Res data normmally contains an array of locations around the world. So attempt to find correct index for search term.
            //Could expand on this an allow user to search for country as well. Also need to filter by result type for postcodes.
            const getIndex = (d) => {
                return d.findIndex((i) => (i.address_line1.toLowerCase() === location &&
                    i.country_code === "gb") ||
                    i.result_type === "postcode");
            };
            const res = yield callApi(location);
            const { status, data } = res;
            return status === 200 && data.results.length > 0 //Check to see if we received location data back.
                ? data.results[getIndex(data.results)]
                : null;
        });
    }
    static reverseGeo({ lat, lon }) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${keys_js_1.apiKeys.geoapify}`;
            const res = yield axios.get(url);
            return res.status === 200 ? res.data.results[0] : null;
        });
    }
}
exports.default = Location;
