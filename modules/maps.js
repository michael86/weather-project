export default class Maps {
  #Bing;

  constructor({ latitude: lat, longitude: lon }) {
    this.#Bing = new Microsoft.Maps.Map("#mapContainer");
    this.updateLocation(lat, lon);
  }

  updateLocation(lat, lon) {
    console.log("updating optiopns");
    this.#Bing.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      center: new Microsoft.Maps.Location(lat, lon),
      zoom: 14,
    });

    this.#Bing.setOptions({
      disableScrollWheelZoom: true, //For some reason, setting this in the above setView doesn't work, so just set it by calling setOptions
    });
  }
}
