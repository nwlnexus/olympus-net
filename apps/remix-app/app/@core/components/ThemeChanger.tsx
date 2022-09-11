import { Dropdown } from 'react-daisyui';
import { Icon } from '@iconify/react';
import swatchIcon from '@iconify/icons-heroicons/swatch';
import chevronDown from '@iconify/icons-heroicons/chevron-down';
import { themeOptions } from '~/core/constants';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';

export function ThemeChanger() {
  useEffect(() => {
    themeChange(false);
  });

  return (
    <>
      <Dropdown vertical='end' title='Change theme'>
        <Dropdown.Toggle tabIndex={0} className='gap-1 normal-case' button={true} size='md'>
          <Icon icon={swatchIcon} width={20} height={20} className='inline-block h-5 w-5 md:h-6 md:w-6' />
          <Icon icon={chevronDown} className='ml-1 hidden h-3 w-3 opacity-60 sm:inline-block' />
        </Dropdown.Toggle>
        <div className='dropdown-content rounded-t-box rounded-b-box top-px mt-16 max-h-96 w-52 overflow-y-auto bg-base-200 text-base-content shadow-2xl'>
          <div className='grid grid-cols-1 gap-3 p-3' tabIndex={0}>
            {themeOptions.map((item, idx) => (
                <div
                  key={idx}
                  className='overflow-hidden rounded-lg outline outline-2 outline-offset-2 outline-base-content'
                  data-set-theme={item}
                  data-act-class='outline'
                >
                  <div data-theme={item} className='w-full cursor-pointer bg-base-100 font-sans text-base-content'>
                    <div className='grid grid-cols-5 grid-rows-3'>
                      <div className='col-span-5 row-span-3 row-start-1 flex gap-1 py-3 px-4'>
                        <div className='flex-grow text-sm font-bold'>{item}</div>
                        <div className='flex flex-shrink-0 flex-wrap gap-1'>
                          <div className='w-2 rounded bg-primary' />
                          <div className='w-2 rounded bg-secondary' />
                          <div className='w-2 rounded bg-accent' />
                          <div className='w-2 rounded bg-neutral' />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </Dropdown>
    </>
  );
}
