export * from "./site";
export * from "./navigation";

export const AUTH_COOKIE_NAME = "hireinbox_session";
export const AUTH_COOKIE_MAX_AGE = 604800;

export const PROTECTED_ROUTES = ["/dashboard"];
export const AUTH_ROUTES = ["/login", "/signup", "/register", "/forgot-password"];
