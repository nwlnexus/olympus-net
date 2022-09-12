import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/services/auth/auth.server';
import type { LoaderArgs } from '~/remix';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  await authenticator.isAuthenticated(request, {
    failureRedirect: '/auth/login'
  });

  return null;
};

export default function ProfileView() {
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}
