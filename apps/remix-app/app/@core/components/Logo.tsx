import { clsx } from 'clsx';

export function Logo() {
  return (
    <>
      <a href='/'>
        <span className={clsx('mr-1 lowercase text-amber-600')}>helios</span>
        <span
          className={clsx('rounded-tl-xl rounded-br-xl border-2 border-t-amber-400 border-b-amber-400 p-1 uppercase')}
        >
          ui
        </span>
      </a>
    </>
  );
}
