export {};

declare global {
  const SESSION_SECRET: string;
  const HELIOS_KV: KVNamespace;
}

export interface Env {
  SESSION_SECRET: string;
  HELIOS_KV: KVNamespace;
}
