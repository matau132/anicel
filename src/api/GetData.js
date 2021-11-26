import axios from "axios";
import { API_URL, PROXY_URL } from "../utils/constants";

export default class AnimeData {
  signal;

  constructor() {
    this.signal = axios.CancelToken.source();
  }

  getAnimeData = async (path) => {
    const url = `${API_URL}${path}`;
    let response;
    let isError = false;

    try {
      response = (await axios.get(url, { cancelToken: this.signal.token }))
        .data;
    } catch (err) {
      if (!axios.isCancel(err)) {
        console.log("Error: ", err.message);
        try {
          const proxyUrl = `${PROXY_URL}?url=${encodeURIComponent(url)}`;
          response = (
            await axios.get(proxyUrl, { cancelToken: this.signal.token })
          ).data;
        } catch (err) {
          if (!axios.isCancel(err)) {
            isError = true;
            console.log("Error: ", err.message);
          }
        }
      }
    }
    return { response, isCancel: axios.isCancel(), isError };
  };
}
