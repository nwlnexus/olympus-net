import type { ActionArgs } from '~/remix';
import { Outlet } from '~/remix';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { generateConfigs } from '~/utils/auth-config.server';

export const action = async ({ request, context }: ActionArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);

  return authenticator.authenticate('auth0', request);
};

export default function AuthLayout() {
  return (
    <>
      <div className='flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8'>
        <Outlet />
      </div>
    </>
  );
}
