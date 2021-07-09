/**
 * Logout of microsoft's authentication provider.
 *
 * Documentation:
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript
 */
export default function logout() {
  window.location.href = '/.auth/logout?post_logout_redirect_uri=/';
}