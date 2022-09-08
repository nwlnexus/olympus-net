import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { createAuthSessionStorage, type SessionConfig } from '~/core/services/auth/session.server';
import type { User } from '~/types/user';

export type AuthConfig = {
  callbackURL: string;
  clientID: string;
  clientSecret: string;
  domain: string;
};

export const getAuthenticator = async (authConfig: AuthConfig, sesssionConfig: SessionConfig) => {
  const authenticator = new Authenticator<User>(await createAuthSessionStorage(sesssionConfig));

  let auth0Strategy = new Auth0Strategy(authConfig, async ({ profile }) => {
    return {
      id: profile.id,
      displayName: profile.displayName,
      email: profile.emails[0].value
    };
  });
  authenticator.use(auth0Strategy);

  return authenticator;
};
