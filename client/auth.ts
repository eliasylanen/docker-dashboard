import * as auth0 from 'auth0-js';

import history from './history';

const Auth = () => {
  const auth = new auth0.WebAuth({
    domain: 'pepetopo.eu.auth0.com',
    audience: 'https://bkrebs.auth0.com/userinfo',
    clientID: 'IaYcyB22sS033iV8a53DnID8w8yvwBzh',
    redirectUri: 'http://localhost:3000/callback',
    responseType: 'token',
    scope: 'openid',
  });

  const handleAuthentication = () => {
    auth.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        this.setSession(authResult);
        history.replace('/home');
      } else if (err) {
        history.replace('/home');
        console.error(err);
      }
    });
  };

  const setSession = authResult => {
    // Set the time that the access token will expire at
    const expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('expires_at', expiresAt);
    // navigate to the home route
    history.replace('/home');
  };

  const login = () => {
    auth.authorize();
  };

  const logout = () => {
    // Clear access token and expiration from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('expires_at');
    // navigate to the home route
    history.replace('/home');
  };

  const isAuthenticated = () => {
    // Check whether the current time is past the
    // access token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  };

  return {
    handleAuthentication,
    setSession,
    login,
    logout,
    isAuthenticated,
  };
};

export default Auth;
