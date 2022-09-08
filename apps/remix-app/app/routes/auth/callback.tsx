import { generateConfigs } from '~/@core/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import type { LoaderArgs } from '~/remix';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);

  return authenticator.authenticate('auth0', request, {
    successRedirect: '/dashboard',
    failureRedirect: '/auth/login'
  });
};
