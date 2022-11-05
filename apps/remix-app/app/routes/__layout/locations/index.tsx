import { json, redirect, useLoaderData, type LoaderArgs } from '~/remix';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { EmptyObject } from '~/components';
import invariant from 'tiny-invariant';

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

  const resp = await fetch(`${context.env.HELIOS_URL}/locations`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });

  invariant(resp, 'Error 1000');

  const kvLocs: LocationEntity[] | [] = await resp.json();
  return json(kvLocs);
};

export default function Location() {
  const locations = useLoaderData<typeof loader>();

  if (locations.length !== 0) {
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
