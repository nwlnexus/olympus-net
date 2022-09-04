import { clsx } from 'clsx';

export function Logo() {
  return (
    <>
      <a href='/'>
        <span className={clsx('mr-1 lowercase text-amber-600')}>helios</span>
        <span className={clsx('rounded border-2 p-1 uppercase')}>ui</span>
      </a>
    </>
  );
}
