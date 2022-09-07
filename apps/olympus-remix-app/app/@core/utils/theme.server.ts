import { createCookieSessionStorage } from '@remix-run/cloudflare';

import type { Theme } from './theme-provider';
import { isTheme } from './theme-provider';

async function getThemeSession(request: Request, sessionSecret: unknown) {
  const themeStorage = createCookieSessionStorage({
    cookie: {
      name: 'sscan-ui-theme',
      secure: true,
      secrets: [sessionSecret as string],
      sameSite: 'lax',
      path: '/',
      httpOnly: true
    }
  });

  const session = await themeStorage.getSession(request.headers.get('Cookie'));
  return {
    getTheme: () => {
      const themeValue = session.get('theme');
      return isTheme(themeValue) ? themeValue : null;
    },
    setTheme: (theme: Theme) => session.set('theme', theme),
    commit: () => themeStorage.commitSession(session)
  };
}

export { getThemeSession };
