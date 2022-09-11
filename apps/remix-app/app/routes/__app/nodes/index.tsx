import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect } from '~/remix';
import type { LoaderArgs } from '~/remix';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = new URL(request.url);

  // TODO: Correct this to block access to all other pages but main page and about
  if (pathname !== '/' && !user) {
    return redirect('/auth/login');
  }

  return null;
};

export default function Nodes() {
  return <></>;
}
