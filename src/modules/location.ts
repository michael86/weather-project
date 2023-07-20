import { apiKeys } from "../keys.js";
import axios from "axios";

export default class Location {
  static async convertLocation(location: string) {
    location = location.toLowerCase();

    const callApi = async (l: string) =>
      axios.get(
        `https://api.geoapify.com/v1/geocode/search?text=${l}&lang=en&limit=10&type=city&format=json&apiKey=${apiKeys.geoapify}`
      );

    //Res data normmally contains an array of locations around the world. So attempt to find correct index for search term.
    //Could expand on this an allow user to search for country as well. Also need to filter by result type for postcodes.
    const getIndex = (d: [{address_line1: string, country_code: string,
    result_type: string}]) => {
      return d.findIndex(
        (i) =>
          (i.address_line1.toLowerCase() === location &&
            i.country_code === "gb") ||
          i.result_type === "postcode"
      );
    };

    const res = await callApi(location);
    const { status, data } = res;

    return status === 200 && data.results.length > 0 //Check to see if we received location data back.
      ? data.results[getIndex(data.results)]
      : null;
  }

  static async reverseGeo({ lat, lon }: {lat: number, lon: number}) {
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&format=json&apiKey=${apiKeys.geoapify}`;
    const res = await axios.get(url);
    return res.status === 200 ? res.data.results[0] : null;
  }
}
