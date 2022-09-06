// export {};
//
// declare global {
//   const AUTH0_CALLBACK_URL: string;
//   const AUTH0_CLIENT_ID: string;
//   const AUTH0_CLIENT_SECRET: string;
//   const AUTH0_DOMAIN: string;
//   const COOKIE_TAG: string;
//   const COOKIE_KEY: string;
//   const SESSION_SECRET: string;
//   const HELIOS: KVNamespace;
//   const DB: D1Database;
//   const NODE_ENV: string;
// }

export interface Env {
  AUTH0_CALLBACK_URL: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_CLIENT_SECRET: string;
  AUTH0_DOMAIN: string;
  COOKIE_TAG: string;
  COOKIE_KEY: string;
  SESSION_SECRET: string;
  HELIOS: KVNamespace;
  DB: D1Database;
  NODE_ENV: string;
}
