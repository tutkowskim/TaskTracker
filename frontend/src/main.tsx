import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-3f6v4cwp.us.auth0.com"
      clientId="lVNgqtitoK3DnSwUTqsftInUpac4hXu0"
      authorizationParams={{ redirect_uri: window.location.origin }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
