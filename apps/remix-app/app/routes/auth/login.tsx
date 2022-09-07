import { Logo } from '~/components';

export default function LoginView() {
  return (
    <>
      <section className='bg-gray-50 dark:bg-gray-900'>
        <div className='flex flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0'>
          <Logo />
        </div>
        <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
          <div className='space-y-4 p-6 sm:p-8 md:space-y-6'></div>
        </div>
      </section>
    </>
  );
}
