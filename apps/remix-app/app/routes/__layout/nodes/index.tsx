import { json, useLoaderData } from '~/remix';
import type { LoaderArgs } from '~/remix';
import { EmptyObject } from '~/components/EmptyObject';
import invariant from 'tiny-invariant';
import { isLoggedIn } from '~/services/verify-logged-in';

type EdgeNode = {
  uuid: string;
};

export const loader = async ({ request, context }: LoaderArgs) => {
  await isLoggedIn(request, context);

  const resp = await fetch(`${context.env.HELIOS_URL}/nodes`);

  invariant(resp, 'Error 1000');

  const respNodes: EdgeNode[] | [] = await resp.json();
  return json(respNodes);
};

export default function Nodes() {
  const nodes = useLoaderData<typeof loader>();

  if (nodes.length === 0) return <EmptyObject objectType={'node'} />;
  return (
    <>
      <h1>Nodes</h1>
    </>
  );
}
