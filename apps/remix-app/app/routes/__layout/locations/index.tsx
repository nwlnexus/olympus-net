import { json, redirect, useLoaderData, type LoaderArgs } from '~/remix';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { EmptyObject } from '~/components';

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

  const kvLocs: LocationEntity[] | null = await context.env.KV.get('locations', { type: 'json' });

  return json(kvLocs);
};

export default function Location() {
  const locations = useLoaderData<typeof loader>();

  if (locations) {
    return (
      <>
        <h1>Locations</h1>
      </>
    );
  }
  return (
    <>
      <EmptyObject objectType={'location'} />
    </>
  );
}
