import type { LoaderArgs } from '~/remix';
import { isLoggedIn } from '~/services/verify-logged-in';

export const loader = async ({ request, context }: LoaderArgs) => {
  await isLoggedIn(request, context);

  return null;
};

export default function Reports() {
  return (
    <div>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a target='_blank' href='https://remix.run/tutorials/blog' rel='noreferrer'>
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/tutorials/jokes' rel='noreferrer'>
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target='_blank' href='https://remix.run/docs' rel='noreferrer'>
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
