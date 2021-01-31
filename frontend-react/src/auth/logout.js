export default function logout() {
  window.location.href = '/.auth/logout?post_logout_redirect_uri=/';
}