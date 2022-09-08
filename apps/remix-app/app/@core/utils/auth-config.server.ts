import type { AuthConfig } from '~/core/services/auth/auth.server';
import type { SessionConfig } from '~/core/services/auth/session.server';
import type { LoaderArgs } from '~/remix';

export function generateConfigs(context: LoaderArgs) {
  const authConfig: AuthConfig = {
    callbackURL: context.env.AUTH0_CALLBACK_URL,
    clientID: context.env.AUTH0_CLIENT_ID,
    clientSecret: context.env.AUTH0_CLIENT_SECRET,
    domain: context.env.AUTH0_DOMAIN
  };
  const sessionConfig: SessionConfig = {
    tag: context.env.SESSION_TAG,
    secrets: [context.env.SESSION_SECRET],
    kv: context.env.HELIOS_KV
  };

  return {
    authConfig,
    sessionConfig
  };
}
