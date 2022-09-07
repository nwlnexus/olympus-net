/// <reference types="@cloudflare/workers-types" />

interface Env {
  __STATIC_CONTENT: KVNamespace;
  HELIOS_KV: KVNamespace;
  HELIOS_DB: D1Database;
  SESSION_SECRET: string;
  CLOUDFLARE_ACCOUNT_ID: string;
  CLOUDFLARE_API_TOKEN: string
}
