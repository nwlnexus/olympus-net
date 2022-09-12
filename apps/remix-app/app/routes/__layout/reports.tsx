import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect } from '~/remix';
import type { LoaderArgs } from '~/remix';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = new URL(request.url);

  // TODO: Correct this to block access to all other pages but main page and about
  if (pathname !== '/' && !user) {
    return redirect('/auth/login');
  }

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
