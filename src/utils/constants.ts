const isLocalhost =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

export const BASE_URL = !isLocalhost ? "/api" : "http://localhost:3000";

export const API_URLS = {
  login: "/login",
  signup: "/signup",
  profile: "/profile/view",
  logout: "/logout",
  feed: "/feed",
  editProfile: "/profile/edit",
  connections: "/user/connections",
  requests: "/user/request/received",
  review: "/request/review/{status}/",
  sendConnection: "/request/send/{status}/",
};
