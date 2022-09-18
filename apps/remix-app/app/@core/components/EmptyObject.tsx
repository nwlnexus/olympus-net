import { Icon } from '@iconify/react';
import plusIcon from '@iconify/icons-heroicons/plus';
import serverStack from '@iconify/icons-heroicons/server-stack';
import buildingStack from '@iconify/icons-heroicons/building-office-2';
import tunnelLinks from '@iconify/icons-heroicons/link';
import { Button } from 'react-daisyui';
import { useGlobalState } from '~/store/global/global.provider';

type EmptyObjectProps = {
  objectType: 'node' | 'location' | 'tunnel';
};

export function EmptyObject({ objectType }: EmptyObjectProps) {
  const { dispatch } = useGlobalState();
  const useObjectType = (() => {
    switch (objectType) {
      case 'node':
        return { icon: serverStack, dispatchType: 'OPEN_NEWNODE_MDL' as const };
      case 'location':
        return { icon: buildingStack, dispatchType: 'OPEN_NEWLOCATION_MDL' as const };
      case 'tunnel':
        return { icon: tunnelLinks, dispatchType: 'OPEN_NEWTUNNEL_MDL' as const };
      default:
        throw new Error(`Unhandled empty object type: ${objectType}`);
    }
  })();

  return (
    <>
      <div className='text-center'>
        <Icon icon={useObjectType.icon} className='mx-auto h-12 w-12 text-gray-400' />
        <h3 className='mt-2 text-sm font-medium'>{`No ${objectType}s`}</h3>
        <p className='mt-1 text-sm'>{`Get started by creating a new ${objectType}.`}</p>
        <div className='mt-6'>
          <Button
            color='primary'
            variant='outline'
            animation={true}
            onClick={() => dispatch({ type: useObjectType.dispatchType })}
          >
            <Icon icon={plusIcon} className='-ml-1 mr-2 h-5 w-5' aria-hidden='true' />
            {`New ${objectType}`}
          </Button>
        </div>
      </div>
    </>
  );
}
