import { useState, useEffect } from 'react';

const AUTH_INFO_API = '/.auth/me';

/**
 * Hook for interacting with the built in authentication for Azure Static Web Apps.
 *
 * Documentation:
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/authentication-authorization
 * - https://docs.microsoft.com/en-us/azure/static-web-apps/user-information?tabs=javascript
 */
export default function useAuth() {
  const [auth, setAuth] = useState({
    isLoadingAuthStatus: true,
    isAuthenticated: false,
    user: null,
  });

  useEffect(() => {
    const fetchAuthData = async () => {
      const response = await fetch(AUTH_INFO_API);
      const data = await response.json();
      const user = data.clientPrincipal;

      setAuth({
        isLoading: false,
        isAuthenticated: !!user,
        user,
      });
    }
    fetchAuthData();
  }, []);

  return auth;
}
