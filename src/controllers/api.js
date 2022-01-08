import axios from "axios";
import _ from "lodash";

export const searchAPI = _.memoize(async (query) => {
  const res = await axios.get(
    `https://images-api.nasa.gov/search?media_type=image${
      query ? "&q=" + query : ""
    }`
  );
  return res;
});

export const customCall = _.memoize(async (url) => {
  url = url.replace(/^http:\/\//i, "https://");
  const res = await axios.get(url);
  return res;
});
