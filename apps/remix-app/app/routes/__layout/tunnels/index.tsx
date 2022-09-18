import { json, type LoaderArgs, useLoaderData } from '~/remix';
import type { CFTunnelResp } from '~/types/tunnels';
import { cfApiUrl } from '~/core/constants';
import { Table } from 'react-daisyui';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect } from '~/remix';
import { EmptyObject } from '../../../@core/components';

export const loader = async ({ request, context }: LoaderArgs) => {
  const { authConfig, sessionConfig } = generateConfigs(context);
  const authenticator = await getAuthenticator(authConfig, sessionConfig);
  const user = await authenticator.isAuthenticated(request);
  const { pathname } = new URL(request.url);

  // TODO: Correct this to block access to all other pages but main page and about
  if (pathname !== '/' && !user) {
    return redirect('/auth/login');
  }

  const resp = await fetch(`${cfApiUrl}/accounts/${context.env.CLOUDFLARE_ACCOUNT_ID}/cfd_tunnel`, {
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${context.env.CLOUDFLARE_API_TOKEN}`
    }
  });

  if (!resp) {
    throw json(resp, { status: 500 });
  }
  const tunnels: CFTunnelResp = await resp.json();

  return json(tunnels.result);
};

export default function Index() {
  const tunnels = useLoaderData<typeof loader>();

  if (tunnels) {
    return (
      <div className='p-6'>
        <header>Some value goes here</header>
        {/* Table display */}
        <div className='overflow-x-auto'>
          <Table>
            <Table.Head key={'tunnels-head'}>
              <span key={'blank'} />
              <span key={'name'}>Name</span>
              <span key={'status'}>Status</span>
            </Table.Head>
            <Table.Body>
              {tunnels.map((item, idx) => (
                <Table.Row key={idx}>
                  <span>{idx}</span>
                  <span>{item.name}</span>
                  <span>{item.status}</span>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </div>
    );
  }
  return (
    <>
      <EmptyObject objectType={'tunnel'} />
    </>
  );
}
