import axios from "axios";
import _ from "lodash";

export const searchAPI = async (query, filters) => {
  let url = "https://images-api.nasa.gov/search?";
  filters.forEach((f) => {
    url += "&" + f.key + "=" + f.value;
  });
  url += "&q=" + query;
  const res = await axios.get(url);
  return res;
};

export const customCall = _.memoize(async (url) => {
  url = url.replace(/^http:\/\//i, "https://");
  const res = await axios.get(url);
  return res;
});
