import { json } from '@remix-run/cloudflare';
import { getThemeSession } from '~/utils/theme.server';
import { isTheme } from '~/utils/theme-provider';

import type { ActionFunction } from '@remix-run/cloudflare';

export const action: ActionFunction = async ({ request, context }) => {
  const sessionSecret = context.SESSION_SECRET;
  if (!sessionSecret) {
    throw new Error('SESSION_SECRET must be set');
  }

  const themeSession = await getThemeSession(request, sessionSecret);
  const requestText = await request.text();
  const form = new URLSearchParams(requestText);
  const theme = form.get('theme');

  if (!isTheme(theme)) {
    return json({
      success: false,
      message: `theme value of ${theme} is not a valid theme`
    });
  }

  themeSession.setTheme(theme);
  return json({ success: true }, { headers: { 'Set-Cookie': await themeSession.commit() } });
};
