import { Authenticator } from 'remix-auth';
import { Auth0Strategy } from 'remix-auth-auth0';
import { appSessionStorage, type SessionConfig } from '~/services/auth/session.server';
import type { User } from '~/types/user';

type AuthConfig = {
  callbackURL: string;
  clientID: string;
  clientSecret: string;
  domain: string;
};

const getAuthenticator = async (authConfig: AuthConfig, sesssionConfig: SessionConfig) => {
  const { sessionStorage } = await appSessionStorage(sesssionConfig);
  const authenticator = new Authenticator<User>(sessionStorage);

  let auth0Strategy = new Auth0Strategy(authConfig, async ({ profile }) => {
    console.log(profile);
    return {
      id: profile.id,
      displayName: profile._json.name,
      email: profile._json.email,
      email_verified: profile._json.email_verified,
      picture: profile._json.picture,
      nickname: profile._json.nickname
    };
  });
  authenticator.use(auth0Strategy);

  return authenticator;
};

export { type AuthConfig, getAuthenticator };
