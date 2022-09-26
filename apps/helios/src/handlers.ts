import { error, json } from 'itty-router-extras';
import type { AppEnv, AppRequest, LocationEntity } from '~/types/env';
import { locSchema, StatusEnum } from '~/types/env';
import { ulidFactory } from 'ulid-workers';

const ulid = ulidFactory();

export async function getLocations(r: AppRequest, e: AppEnv, _ctx: ExecutionContext): Promise<Response> {
  const { uuid } = r;
  let stmt: D1PreparedStatement;
  let qry: D1Result;

  if (typeof uuid === 'undefined') {
    stmt = e.DB.prepare('SELECT * from locations');
  } else {
    stmt = e.DB.prepare('SELECT * FROM locations WHERE UUID = ?1').bind(uuid);
  }
  try {
    qry = await stmt.all();

    if (qry.results) {
      return json(qry.results);
    } else {
      return json([]);
    }
  } catch (e: any) {
    console.log(e);
    return error(400, 'Something happened.');
  }
}

export async function createLocation(r: AppRequest, e: AppEnv, _ctx: ExecutionContext): Promise<Response> {
  const { content } = r;
  const validation = locSchema.omit({ uuid: true, status: true }).safeParse(content);
  if (!validation.success) return error(400, validation.error);

  let tmp_loc: Partial<LocationEntity> = {
    uuid: ulid()
  };

  tmp_loc = Object.assign(tmp_loc, content);
  if (typeof tmp_loc.status === 'undefined') tmp_loc.status = StatusEnum.enum.PENDING;

  try {
    const stmt = e.DB.prepare('INSERT INTO locations (uuid, loc_name, kind, status) VALUES (?1, ?2, ?3, ?4)').bind(
      tmp_loc.uuid,
      tmp_loc.loc_name,
      tmp_loc.kind,
      tmp_loc.status
    );
    const result = await stmt.run();
    console.log(result);

    return json([]);
  } catch (e: any) {
    console.log({
      message: e.message,
      cause: e.cause.message
    });
    if (e.message.startsWith('D1_')) {
      return error(400, 'DB error occured: ' + e.cause.message);
    }
    return error(400, 'Something happened');
  }
}

export async function getNodes(r: AppRequest, e: AppEnv, _ctx: ExecutionContext): Promise<Response> {
  const { uuid } = r;
  let stmt, qry;

  if (typeof uuid === 'undefined') {
    stmt = e.DB.prepare('SELECT * from nodes');
  } else {
    stmt = e.DB.prepare('SELECT * FROM nodes WHERE UUID = ?1').bind(uuid);
  }
  qry = await stmt?.run();
  if (qry && qry.results && qry.results.length > 0) {
    return json(qry.results);
  } else {
    return json([]);
  }
}

export async function getTunnels(_r: AppRequest, _e: AppEnv, _ctx: ExecutionContext): Promise<Response> {
  return json({});
}
