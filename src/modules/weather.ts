import { apiKeys } from "../keys";
import {
  GenObject,
  GenObjectRes,
  Location,
  SortWeather,
  SortWeatherRes,
} from "../schemas/interfaces";
import axios from "axios";

export default class Weather {
  #lat: number;
  #lon: number;
  #api: string;

  constructor(location: Location) {
    this.#lat = location.latitude;
    this.#lon = location.longitude;

    this.#api = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.#lat}&lon=${
      this.#lon
    }&appid=${apiKeys.openWeather}`;
  }

  async getWeather() {
    let res = await axios.get(this.#api).catch((e) => {
      console.log(`api: ${this.#api}`);
      console.log(`error: ${e.message}`);
    });

    return res?.status === 200 ? res.data : null;
  }

  sortWeather(o: SortWeather): SortWeatherRes {
    //This generates a sorted object of arrays arranged by date and time.
    const res: SortWeatherRes = {};

    const genObject = (i: GenObject): GenObjectRes => {
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

    o.list.forEach((i: GenObject) => {
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

  set geo({ lat, lng }) {
    this.#lat = lat;
    this.#lon = lng;
    this.updateApi();
  }

  updateApi() {
    this.#api = `https://api.openweathermap.org/data/2.5/forecast?lat=${this.#lat}&lon=${
      this.#lon
    }&appid=${apiKeys.openWeather}`;
  }
}
