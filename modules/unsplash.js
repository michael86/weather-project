import { apiKeys } from "../keys.js";

export class Unsplash {
  async photo(q) {
    const res = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query: q },
      headers: {
        Authorization: `Client-ID ${apiKeys.unsplash}`,
      },
    });

    return res.status === 200 ? res.data.results : null;
  }
}
