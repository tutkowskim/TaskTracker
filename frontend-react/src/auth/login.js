export default function logout() {
  window.location.href = '/.auth/login/google?post_login_redirect_uri=/';
}