import { createCloudflareKVSessionStorage } from '~/remix';

type SessionConfig = {
  tag: string;
  secrets: string[];
  kv: KVNamespace;
};

const appSessionStorage = async ({ tag, secrets, kv }: SessionConfig) => {
  return createCloudflareKVSessionStorage({
    cookie: {
      name: tag, // use any name you want here
      sameSite: 'lax', // this helps with CSRF
      path: '/', // remember to add this so the cookie will work in all routes
      httpOnly: true, // for security reasons, make this cookie http only
      secrets, // replace this with an actual secret
      secure: process.env.NODE_ENV === 'production' // enable this in prod only
    },
    kv
  });
};

export { type SessionConfig, appSessionStorage };
