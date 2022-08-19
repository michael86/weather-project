export default class Maps {
  #Bing;

  constructor({ latitude: lat, longitude: lon }) {
    this.#Bing = new Microsoft.Maps.Map("#mapContainer");
    this.updateLocation(lat, lon);
  }

  updateLocation(lat, lon) {
    this.#Bing.setView({
      mapTypeId: Microsoft.Maps.MapTypeId.aerial,
      center: new Microsoft.Maps.Location(lat, lon),
      zoom: 14,
    });
  }
}
