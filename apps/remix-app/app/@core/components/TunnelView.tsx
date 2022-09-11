import type { CFTunnel } from '~/types';
import { Card, Collapse } from 'react-daisyui';

type TunnelViewProps = {
  tunnel: CFTunnel;
};

export function TunnelView({ tunnel }: TunnelViewProps) {
  return (
    <div className='w-full'>
      <Collapse className='border-base-500 rounded-box border bg-base-300' icon='arrow'>
        <Collapse.Title>{tunnel.name}</Collapse.Title>
        <Collapse.Content>
          <Card>
            <Card.Body>
              <Card.Title>{tunnel.name}</Card.Title>
            </Card.Body>
          </Card>
        </Collapse.Content>
      </Collapse>
    </div>
  );
}
