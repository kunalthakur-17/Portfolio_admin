import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import tokenManager from "../../utils/tokenManager";

const apiUrl = import.meta.env.VITE_APP_API_URL;

// content type
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.baseURL = apiUrl;
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (!navigator.onLine) {
      window.location.href = "/no-internet";
      return Promise.reject("No internet connection");
    }
    if (!error.response) {
      return Promise.reject(error);
    }
    const { status, data } = error.response;
    let message;

    switch (status) {
      case 400:
        message = data?.message || data?.error || "Bad Request";
        break;
      case 401:
        message = data?.message || "Unauthorized access";
        if (!window.location.pathname.includes('/login')) {
          // Use centralized token manager for consistent handling
          tokenManager.handleTokenExpired();
        }
        break;
      case 403:
        message = data?.message || "Access Forbidden";
        sessionStorage.clear();
        localStorage.clear();
        window.location.href = "/login";
        break;
      case 404:
        message =
          data?.message ||
          "Sorry! The data you are looking for could not be found.";

        const isUserRelated =
          (data?.message &&
            (data.message.toLowerCase().includes("vendor not found") ||
              data.message.toLowerCase().includes("staff not found") ||
              data.message.toLowerCase().includes("admin not found") ||
              data.message.toLowerCase().includes("client not found") ||
              data.message.toLowerCase().includes("user not found"))) ||
          (error.config?.url &&
            (error.config.url.includes("/client/profile") ||
              error.config.url.includes("/vendor/profile") ||
              error.config.url.includes("/staff/profile") ||
              error.config.url.includes("/admin/profile")));

        if (isUserRelated) {
          sessionStorage.clear();
          localStorage.clear();
          window.dispatchEvent(new CustomEvent("userDeleted"));
          setTimeout(() => {
            window.location.href = "/login";
          }, 100);
        }
        break;
      case 500:
        message = data?.message;
        break;
      default:
        message =
          data?.message || error.message || "An unknown error occurred.";
    }

    return Promise.reject(error);
  }
);

const AUTH_SESSION_KEY = "event_management_user";

/**
 * Sets the default authorization
 * @param {*} token
 */
const setAuthorization = (token) => {
  if (token) axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  else delete axios.defaults.headers.common["Authorization"];
};

/**
 * Ensures authorization header is set from available tokens
 */
const ensureAuthorization = () => {
  const token = sessionStorage.getItem("token") || localStorage.getItem("accessToken");
  if (token) {
    setAuthorization(token);
  }
};

const getUserFromSession = () => {
  const user = sessionStorage.getItem(AUTH_SESSION_KEY);
  return user ? (typeof user == "object" ? user : JSON.parse(user)) : null;
};
class APICore {
  /**
   * Fetches data from given url
   */
  get = (url, params) => {
    ensureAuthorization();
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, params);
    } else {
      response = axios.get(`${url}`, params);
    }
    return response;
  };

  getFile = (url, params) => {
    let response;
    if (params) {
      var queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
      response = axios.get(`${url}?${queryString}`, { responseType: "blob" });
    } else {
      response = axios.get(`${url}`, { responseType: "blob" });
    }
    return response;
  };

  getMultiple = (urls, params) => {
    const reqs = [];
    let queryString = "";
    if (params) {
      queryString = params
        ? Object.keys(params)
            .map((key) => key + "=" + params[key])
            .join("&")
        : "";
    }

    for (const url of urls) {
      reqs.push(axios.get(`${url}?${queryString}`));
    }
    return axios.all(reqs);
  };

  /**
   * post given data to url
   */
  create = (url, data) => {
    ensureAuthorization();
    return axios.post(url, data);
  };

  /**
   * Updates patch data
   */
  updatePatch = (url, data) => {
    ensureAuthorization();
    return axios.patch(url, data);
  };

  /**
   * Updates data
   */
  update = (url, data) => {
    ensureAuthorization();
    return axios.put(url, data);
  };

  /**
   * Deletes data
   */
  delete = (url, data) => {
    ensureAuthorization();
    return axios.delete(url, { data });
  };

  /**
   * post given data to url with file
   */
  createWithFile = (url, data) => {
    ensureAuthorization();
    let formData;

    // If data is already FormData, use it directly
    if (data instanceof FormData) {
      formData = data;
    } else {
      // Otherwise, create FormData from object
      formData = new FormData();
      for (const k in data) {
        formData.append(k, data[k]);
      }
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.post(url, formData, config);
  };

  /**
   * post given data to url with file
   */
  updateWithFile = (url, data) => {
    ensureAuthorization();
    const formData = new FormData();
    for (const k in data) {
      formData.append(k, data[k]);
    }

    const config = {
      headers: {
        ...axios.defaults.headers,
        "content-type": "multipart/form-data",
      },
    };
    return axios.patch(url, formData, config);
  };

  isUserAuthenticated = () => {
    // Use centralized token manager
    return tokenManager.isTokenValid();
  };

  setLoggedInUser = (session) => {
    if (session)
      sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session));
    else {
      sessionStorage.removeItem(AUTH_SESSION_KEY);
    }
  };

  /**
   * Returns the logged in user
   */
  getLoggedInUser = () => {
    return getUserFromSession();
  };

  setUserInSession = (modifiedUser) => {
    let userInfo = sessionStorage.getItem(AUTH_SESSION_KEY);
    if (userInfo) {
      const { token, user } = JSON.parse(userInfo);
      this.setLoggedInUser({ token, ...user, ...modifiedUser });
    }
  };
}

/*
Check if token available in sessionStorage or localStorage only
*/
let user = getUserFromSession();
if (user) {
  const { token } = user;
  if (token) {
    setAuthorization(token);
  }
} else {
  // Check both sessionStorage and localStorage for token
  const token = sessionStorage.getItem("token") || localStorage.getItem("accessToken");
  if (token) {
    setAuthorization(token);
  }
}

export { APICore, setAuthorization, getUserFromSession, ensureAuthorization };
