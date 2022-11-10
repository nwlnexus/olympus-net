import type { LoaderArgs } from '~/remix';
import { isLoggedIn } from '~/services/verify-logged-in';

export const loader = async ({ request, context }: LoaderArgs) => {
  await isLoggedIn(request, context);

  return null;
};

export default function Dashboard() {
  return (
    <div className={'grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-4'}>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
      <div className='mx-auto w-full max-w-sm rounded-md border border-gray-700 p-4 shadow dark:border-blue-300'>
        <div className='flex animate-pulse space-x-4'>
          <div className='h-10 w-10 rounded-full bg-slate-700 dark:bg-gray-100'></div>
          <div className='flex-1 space-y-6 py-1'>
            <div className='h-2 rounded bg-slate-700 dark:bg-gray-100'></div>
            <div className='space-y-3'>
              <div className='grid grid-cols-3 gap-4'>
                <div className='col-span-2 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
                <div className='col-span-1 h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
              </div>
              <div className='h-2 rounded bg-gray-700 dark:bg-gray-100'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
