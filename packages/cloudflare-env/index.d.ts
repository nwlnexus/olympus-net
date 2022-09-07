/// <reference types="@cloudflare/workers-types" />

interface Env {
  __STATIC_CONTENT: KVNamespace;
  HELIOS_KV: KVNamespace;
  HELIOS_DB: D1Database;
  SESSION_TAG: string;
  SESSION_SECRET: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;
  AUTH0_CALLBACK_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
  AUTH0_DOMAIN: string;
}
