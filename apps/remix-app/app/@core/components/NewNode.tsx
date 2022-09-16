import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-heroicons/plus';
import serverStack from '@iconify/icons-heroicons/server-stack';
import { Button } from 'react-daisyui';

type NewNodeProps = {
  toggle: () => void;
};

export function NodeEmpty({ toggle }: NewNodeProps) {
  return (
    <>
      <div className='text-center'>
        <Icon icon={serverStack} className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-2 text-sm font-medium'>No nodes</h3>
        <p className='mt-1 text-sm'>Get started by creating a new node.</p>
        <div className='mt-6'>
          <Button color='primary' variant='outline' animation={true} onClick={toggle}>
            <Icon icon={plusIcon} className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            New Node
          </Button>
        </div>
      </div>
    </>
  );
}
