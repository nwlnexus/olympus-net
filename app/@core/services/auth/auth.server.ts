import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { sessionStorage } from '~/core/services/auth/session.server';

export const authenticator = new Authenticator(sessionStorage);

let auth0Strategy = new Auth0Strategy(
  {
    callbackURL: AUTH0_CALLBACK_URL,
    clientID: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN
  },
  async ({ accessToken, refreshToken, extraParams, profile }) => {}
);

authenticator.use(auth0Strategy);
