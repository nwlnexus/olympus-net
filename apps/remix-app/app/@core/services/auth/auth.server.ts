import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { createAuthSessionStorage, type SessionConfig } from '~/core/services/auth/session.server';

export type AuthConfig = {
  callbackURL: string;
  clientID: string;
  clientSecret: string;
  domain: string;
};

export const getAuthenticator = async (authConfig: AuthConfig, sesssionConfig: SessionConfig) => {
  const authenticator = new Authenticator(await createAuthSessionStorage(sesssionConfig));

  let auth0Strategy = new Auth0Strategy(authConfig, async ({ profile }) => {
    return profile;
  });
  authenticator.use(auth0Strategy);

  return authenticator;
};
