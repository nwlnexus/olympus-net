import { json, type LoaderArgs, useLoaderData } from '~/remix';
import type { CFTunnelResp } from '~/types/tunnels';
import { cfApiUrl } from '~/core/constants';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect } from '~/remix';
import { EmptyObject } from '~/core/components';
import { createColumnHelper } from '@tanstack/react-table';
import { DataGrid } from '~/components/DataGrid';

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

export default function TunnelsView() {
  const tunnels = useLoaderData<typeof loader>();
  const columnHelper = createColumnHelper<typeof tunnels[0]>();

  if (tunnels) {
    const columns = [
      columnHelper.accessor('name', { cell: info => info.getValue(), header: 'Name' }),
      columnHelper.accessor('created_at', { cell: info => info.getValue() }),
      columnHelper.accessor('deleted_at', { cell: info => info.getValue() }),
      columnHelper.accessor('status', { cell: info => info.getValue() }),
      columnHelper.accessor('remote_config', { cell: info => info.getValue() })
    ];
    console.log(columns);
    return (
      <div className='p-6'>
        {/* Table display */}
        <div className='overflow-x-auto'>
          <DataGrid columns={columns} data={tunnels} />
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
