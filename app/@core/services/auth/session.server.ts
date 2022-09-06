import { createCloudflareKVSessionStorage } from '~/remix';

export const sessionStorage = createCloudflareKVSessionStorage({
  cookie: {
    name: COOKIE_TAG, // use any name you want here
    sameSite: 'lax', // this helps with CSRF
    path: '/', // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [COOKIE_KEY], // replace this with an actual secret
    secure: NODE_ENV === 'production' // enable this in prod only
  },
  kv: HELIOS
});
