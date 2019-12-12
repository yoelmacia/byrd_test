import axios from "axios";

const baseDomain = "http://private-anon-871ee3dfb5-byrd1.apiary-mock.com";
const baseURL = `${baseDomain}/customers`;

export default axios.create({
  baseURL,
  headers: {
    "Access-Control-Allow-Origin": "*"
  }
});
