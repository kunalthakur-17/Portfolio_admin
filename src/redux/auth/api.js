import * as URL from "../../constants/endpoint";
import { APICore } from "../../helpers/api/apiCore";

const api = new APICore();

export function loginApi(data) {
  return api.create(URL.login, data);
}

export function signupApi(data) {
  return api.create(URL.signup, data);
}

export function logoutApi() {
  return api.create(URL.logout);
}
