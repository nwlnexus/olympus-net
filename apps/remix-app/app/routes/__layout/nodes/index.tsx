import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { json, redirect, useLoaderData } from '~/remix';
import type { LoaderArgs } from '~/remix';
import { EmptyObject } from '~/components';
import invariant from 'tiny-invariant';

type EdgeNode = {
  uuid: string;
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

  const resp = await fetch(`${context.env.HELIOS_URL}/nodes`);

  invariant(resp, 'Error 1000');

  const respNodes: EdgeNode[] | [] = await resp.json();
  console.log(respNodes);
  return json(respNodes);
};

export default function Nodes() {
  const nodes = useLoaderData<typeof loader>();

  if (nodes.length !== 0) {
    return (
      <>
        <h1>Nodes</h1>
      </>
    );
  }
  return (
    <>
      <EmptyObject objectType={'node'} />
    </>
  );
}
