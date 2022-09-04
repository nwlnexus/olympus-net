import { json, useLoaderData, type LoaderArgs } from '~/remix';

interface LocationEntity {
  name: string;
  type: 'office' | 'home';
}

export const loader = async ({ context }: LoaderArgs) => {
  const kvLocs: LocationEntity[] | [] = await context.env.HELIOS_KV.get('locations', { type: 'json' });
  return json(kvLocs);
};

export default function Location() {
  const locations = useLoaderData<typeof loader>() ?? [];
}
