import { clsx } from 'clsx';
import { useLocation } from '~/remix';

export function AppSearch() {
  const { pathname } = useLocation();
  return (
    <>
      <div
        className={clsx(
          'pointer-events-none absolute right-8 top-2 gap-1 opacity-50',
          { hidden: pathname === '/' },
          { 'hidden lg:flex': pathname !== '/' }
        )}
      ></div>
    </>
  );
}
