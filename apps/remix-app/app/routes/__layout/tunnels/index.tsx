import { json, type LoaderArgs, useLoaderData } from '~/remix';
import type { CFTunnelResp } from '~/types/tunnels';
import { cfApiUrl } from '~/core/constants';
import { generateConfigs } from '~/utils/auth-config.server';
import { getAuthenticator } from '~/core/services/auth/auth.server';
import { redirect } from '~/remix';
import { EmptyObject } from '~/core/components/EmptyObject';
import { createColumnHelper } from '@tanstack/react-table';
import { DataGrid } from '~/components/DataGrid';
import { Icon } from '@iconify/react';
import intentRequestActive from '@iconify/icons-carbon/intent-request-active';
import intentRequestInactive from '@iconify/icons-carbon/intent-request-inactive';
import invariant from 'tiny-invariant';

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

  invariant(resp);
  const tunnels: CFTunnelResp = await resp.json();
  return json(tunnels.result);
};

export default function TunnelsView() {
  const tunnels = useLoaderData<typeof loader>();
  const columnHelper = createColumnHelper<typeof tunnels[0]>();

  if (tunnels.length === 0) return <EmptyObject objectType={'tunnel'} />;
  const columns = [
    columnHelper.accessor('name', { cell: info => info.getValue(), header: 'Name' }),
    columnHelper.accessor('created_at', { cell: info => info.getValue(), header: 'Created At' }),
    columnHelper.accessor('deleted_at', { cell: info => info.getValue(), header: 'Deleted At' }),
    columnHelper.accessor('status', {
      cell: info =>
        info.getValue() === 'active' ? <Icon icon={intentRequestActive} /> : <Icon icon={intentRequestInactive} />,
      header: 'Status'
    }),
    columnHelper.accessor('remote_config', { cell: info => info.getValue().toString(), header: 'Remote Config' })
  ];
  return (
    <div className='p-6'>
      {/* Table display */}
      <div className='overflow-x-auto'>
        <DataGrid columns={columns} data={tunnels} />
      </div>
    </div>
  );
}
