import { clsx } from 'clsx';
import { useLocation } from '~/remix';

type LogoProps = {
  href?: string;
};

export function Logo({ href = '/' }: LogoProps) {
  const { pathname } = useLocation();

  return (
    <>
      <a href={href}>
        <div className={'inline-flex text-lg text-primary transition-all duration-100 md:text-3xl'}>
          <span className={clsx('mr-2 lowercase', { 'text-primary': pathname !== '/' })}>helios</span>
          <span
            className={clsx('border-t-accent-400 border-b-accent-400 rounded-tl-xl rounded-br-xl border-2 uppercase', {
              'text-base-content': pathname !== '/'
            })}
          >
            ui
          </span>
        </div>
      </a>
    </>
  );
}
