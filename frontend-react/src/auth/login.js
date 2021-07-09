/**
 * Redirect to microsoft's authentication provider using the google identify provider.
 *
 * Documentation:
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript
 */
export default function logout() {
  window.location.href = '/.auth/login/google?post_login_redirect_uri=/';
}