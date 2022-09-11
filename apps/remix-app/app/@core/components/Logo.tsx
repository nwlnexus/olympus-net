import { clsx } from 'clsx';
import { NavLink, useLocation } from '~/remix';

type LogoProps = {
  href?: string;
  showVersion?: boolean;
};

export function Logo({ href = '/', showVersion = false }: LogoProps) {
  const { pathname } = useLocation();

  return (
    <>
      <NavLink to={href} className='btn btn-ghost px-2'>
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
      </NavLink>
      {showVersion && <NavLink to={'/docs/changlog'}>1.0.0</NavLink>}
    </>
  );
}
