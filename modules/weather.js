export default class Weather {
  #lat;
  #lon;
  #api;

  constructor(location) {
    this.#lat = location.latitude;
    this.#lon = location.longitude;
    this.#api = `https://api.openweathermap.org/data/2.5/forecast?lat=${
      this.#lat
    }&lon=${this.#lon}&appid=f8e4e8af8be0c2ff651cc72f90d566b3`;
  }

  async getWeather() {
    let res = await axios.get(this.#api).catch((e) => {
      console.log(`api: ${this.#api}`);
      console.log(`error: ${e.message}`);
    });

    return res.status === 200 ? res.data : null;
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
    return { lat: this.#lat, lng: this.#lon };
  }

  set geo({ lat, lon }) {
    this.#lat = lat;
    this.#lon = lon;
    this.updateApi();
  }

  updateApi() {
    this.#api = `https://api.openweathermap.org/data/2.5/forecast?lat=${
      this.#lat
    }&lon=${this.#lon}&appid=f8e4e8af8be0c2ff651cc72f90d566b3`;
  }
}
