import type { Database } from '@cloudflare/d1';

// Place custom type definitions here. You can have other type definition files elsehwere as well but this
// is just personal convention.

// define KV and global environment variables in the below interface
export interface AppEnv {
  HELIOS_KV: KVNamespace;
  HELIOS_R2: R2Bucket;
  DB: Database;
}

// Custom interface that extends Request and works with itty-router to access the magic that withParams, withContent and so on.
export interface AppRequest extends Request {
  uuid?: string;
  content?: LocationPartial | Location | EdgeNodePartial | EdgeNode;
}

export const roles = ['admin', 'read', 'owner'] as const;
export type AccountRoles = typeof roles[number];
export const accountRolesCheck: Set<string> = new Set(roles);

export function isAccountRole(name: string): boolean {
  const accRole = roles.find((validRoles) => validRoles === name);
  if (accRole) {
    return true;
  }
  return false;
}

export const status = ['active', 'inactive', 'pending'] as const;
export type AccountStatus = typeof status[number];
export const accountStatusCheck: Set<string> = new Set(status);

export function isAccountStatus(name: string): boolean {
  const accStatus = status.find((validStatus) => validStatus === name);
  if (accStatus) {
    return true;
  }
  return false;
}

export type RecordType = 'accounts' | 'nodes' | 'locations';
export type RecordTypePrefix = 'a' | 'n' | 'l' | null;

export interface Location extends LocationPartial {
  uuid: string;
  status: boolean;
  cfd_id?: string;
  ingress?: boolean;
}

export interface LocationPartial {
  name: string;
}

export interface PartialAccount {
  phash: string;
  email: string;
  fname?: string;
  lname?: string;
  permission?: AccountRoles;
  title?: string;
  about?: string;
  img?: string | ArrayBuffer | null;
  cover?: string | ArrayBuffer | null;
}

export interface Account extends PartialAccount {
  uuid: string;
  status: AccountStatus;
}

export interface EdgeNodePartial {
  hostname: string;
  location_uuid: string;
  domain: string;
}
export interface EdgeNode extends EdgeNodePartial {
  uuid: string;
}

interface CloudflareWebsocket {
  accept(): unknown;
  addEventListener(
    event: 'close',
    callbackFunction: (code?: number, reason?: string) => unknown,
  ): unknown;
  addEventListener(event: 'error', callbackFunction: (e: unknown) => unknown): unknown;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addEventListener(event: 'message', callbackFunction: (event: { data: any }) => unknown): unknown;

  /**
   * @param code https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
   * @param reason
   */
  close(code?: number, reason?: string): unknown;
  send(message: string | Uint8Array): unknown;
}

declare class WebSocketPair {
  0: CloudflareWebsocket; // Client
  1: CloudflareWebsocket; // Server
}

interface ResponseInit {
  webSocket?: CloudflareWebsocket;
}
