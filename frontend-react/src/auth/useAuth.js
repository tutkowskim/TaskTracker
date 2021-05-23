import { useState } from 'react';

export default function useAuth() {
  const [auth] = useState({
    isLoadingAuthStatus: false,
    isAuthenticated: true,
    user: {
      userId: 'Mock Id',
      userDetails: 'Mock Details',
      identityProvider: 'Mock Provider',
      userRoles: [
        'Mock',
        'Roles',
      ]
    },
  });

  return auth;
}
