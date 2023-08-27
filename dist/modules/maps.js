"use strict";
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
var _Maps_Bing, _Maps_container;
Object.defineProperty(exports, "__esModule", { value: true });
/// <reference path="types/MicrosoftMaps/CustomMapStyles.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
class Maps {
    constructor({ latitude: lat, longitude: lon }) {
        _Maps_Bing.set(this, void 0);
        _Maps_container.set(this, void 0);
        __classPrivateFieldSet(this, _Maps_Bing, new Microsoft.Maps.Map("#mapContainer"), "f");
        __classPrivateFieldSet(this, _Maps_container, document.getElementById("mapContainer"), "f");
        this.updateLocation(lat, lon);
    }
    updateLocation(lat, lon) {
        __classPrivateFieldGet(this, _Maps_Bing, "f").setView({
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            center: new Microsoft.Maps.Location(lat, lon),
            zoom: 14,
        });
        __classPrivateFieldGet(this, _Maps_Bing, "f").setOptions({
            disableScrollWheelZoom: true, //For some reason, setting this in the above setView doesn't work, so just set it by calling setOptions
        });
    }
    hideMap() {
        __classPrivateFieldGet(this, _Maps_container, "f").style.display = "none";
    }
    showMap() {
        __classPrivateFieldGet(this, _Maps_container, "f").style.display = "block";
    }
}
_Maps_Bing = new WeakMap(), _Maps_container = new WeakMap();
exports.default = Maps;
