import { json, useLoaderData, type LoaderArgs } from '~/remix';

interface LocationEntity {
  name: string;
  type: 'office' | 'home';
}

export const loader = async ({ context }: LoaderArgs) => {
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
