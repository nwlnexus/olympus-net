import { json, type LoaderArgs } from '~/remix';

export const loader = async ({ context }: LoaderArgs) => {
  return json({});
};

export default function Location() {}
