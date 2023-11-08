/**
 *  The API web-services endpoints.
 */
const HTTP_API_SERVER =  process.env.REACT_APP_API_PROTOCOL + "://" + process.env.REACT_APP_API_DOMAIN;

/**
 * Gateway
 */
export const CAPSULE_API_BASE_PATH = "/api/v1";
export const CAPSULE_VERSION_ENDPOINT = "version";
export const CAPSULE_LOGIN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/login";
export const CAPSULE_LOGOUT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/logout";
export const CAPSULE_EXECUTIVE_VISITS_TENANT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/executive-visit-tenant";
export const CAPSULE_DASHBOARD_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/dashboard";
export const CAPSULE_CLIENTS_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/clients";
export const CAPSULE_CLIENT_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/client/{id}";

export const CAPSULE_FORGOT_PASSWORD_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/forgot-password";
export const CAPSULE_PASSWORD_RESET_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/password-reset";
export const CAPSULE_REFRESH_TOKEN_API_ENDPOINT = HTTP_API_SERVER + "/api/v1/refresh-token";
export const CAPSULE_REFRESH_TOKEN_API_URL = HTTP_API_SERVER + '/api/v1/refresh-token';
