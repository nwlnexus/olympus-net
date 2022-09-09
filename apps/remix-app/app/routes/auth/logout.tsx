import type { LoaderArgs } from '~/remix';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig, baseURL } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);

  return authenticator.logout(request, {
    redirectTo: `https://${authConfig.domain}/logout?client_id=${authConfig.clientID}&returnTo=${baseURL}`
  });
};
