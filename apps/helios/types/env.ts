import { z } from 'zod';

export interface AppEnv extends Env {}

export interface AppRequest extends Request {
  uuid?: string;
  query?: Record<string, string>;
  content?: Record<string, string>;
}

export const StatusEnum = z.enum(['ACTIVE', 'INACTIVE', 'PENDING']);
export const KindEnum = z.enum(['HOME', 'OFFICE']);

export const locSchema = z.object({
  uuid: z.string(),
  loc_name: z.string(),
  kind: KindEnum,
  status: StatusEnum
});

export const nodeSchema = z.object({
  uuid: z.string(),
  hostname: z.string(),
  domain: z.string(),
  loc_uuid: z.string(),
  status: StatusEnum
});

export type LocationEntity = z.infer<typeof locSchema>;
export type EdgeNode = z.infer<typeof nodeSchema>;
