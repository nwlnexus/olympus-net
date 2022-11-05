/// <reference types="@cloudflare/workers-types" />

interface Env {
  __STATIC_CONTENT: KVNamespace;
  APP_BASE_URL: string;
  AUTH0_CALLBACK_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
  AUTH0_DOMAIN: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string;
  KV: KVNamespace;
  DB: D1Database;
  R2: R2Bucket;
  HELIOS_URL: string;
  HERMES: Fetcher;
  SESSION_TAG: string;
  SESSION_SECRETS: string;
}
