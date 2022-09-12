import { json, redirect, useLoaderData, type LoaderArgs } from '~/remix';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';

type LocationEntity = {
  name: string;
  type: 'office' | 'home';
};

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = new URL(request.url);

  // TODO: Correct this to block access to all other pages but main page and about
  if (pathname !== '/' && !user) {
    return redirect('/auth/login');
  }

  const kvLocs: LocationEntity[] | null = await context.env.HELIOS_KV.get('locations', { type: 'json' });

  return json(kvLocs);
};

export default function Location() {
  const data = useLoaderData<typeof loader>();

  if (data === null) {
    return <>Empty</>;
  } else if (data && data.length > 0) {
    return <>Not Empty</>;
  }
}
