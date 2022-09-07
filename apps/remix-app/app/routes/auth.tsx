import { Outlet } from '~/remix';

export default function AuthLayout() {
  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <Outlet />
      </div>
    </>
  );
}
