import { json, useLoaderData, type LoaderArgs } from '~/remix';
import { EmptyObject } from '~/components/EmptyObject';
import invariant from 'tiny-invariant';
import { isLoggedIn } from '~/services/verify-logged-in';

type LocationEntity = {
  name: string;
  type: 'office' | 'home';
};

export const loader = async ({ request, context }: LoaderArgs) => {
  await isLoggedIn(request, context);

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
