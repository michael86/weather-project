import { Location } from "../schemas/WeatherInterfaces";
/// <reference path="types/MicrosoftMaps/CustomMapStyles.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.d.ts" />
/// <reference path="types/MicrosoftMaps/Microsoft.Maps.All.d.ts" />
export default class Maps {
  #Bing;
  #container;
  constructor({ latitude: lat, longitude: lon }: Location) {
    this.#Bing = new Microsoft.Maps.Map("#mapContainer");
    this.#container = document.getElementById("mapContainer")!;

    this.updateLocation(lat, lon);
  }

  updateLocation(lat: number, lon: number) {
    this.#Bing.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      center: new Microsoft.Maps.Location(lat, lon),
      zoom: 14,
    });

    this.#Bing.setOptions({
      disableScrollWheelZoom: true, //For some reason, setting this in the above setView doesn't work, so just set it by calling setOptions
    });
  }

  hideMap() {
    this.#container.style.display = "none";
  }

  showMap() {
    this.#container.style.display = "block";
  }
}
