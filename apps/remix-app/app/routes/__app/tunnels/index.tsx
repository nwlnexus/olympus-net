import { json, type LoaderArgs, useLoaderData } from '~/remix';
import type { CFTunnelResp } from '~/types/tunnels';
import { cfApiUrl } from '~/core/constants';
import { Table } from 'react-daisyui';

export const loader = async ({ context }: LoaderArgs) => {
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
  const data = useLoaderData<typeof loader>();

  return (
    <div className='p-6'>
      {/* Table display */}
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            <span />
            <span>Name</span>
            <span>Status</span>
            <span>Remote Config</span>
          </Table.Head>
          <Table.Body>
            {data.map((item, idx) => (
              <Table.Row key={idx}>
                <span />
                <span>{item.name}</span>
                <span>{item.status}</span>
                <span>{item.remote_config}</span>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
