/* eslint-disable @typescript-eslint/no-explicit-any */
import { ulidFactory } from 'ulid-workers';
import { error, json, withContent, withParams, ThrowableRouter } from 'itty-router-extras';
import { AppEnv, AppRequest, EdgeNodePartial, Location, LocationPartial } from '@/janus';

const _404 = new Response(null, { status: 404 });
const router = ThrowableRouter({ base: '/api' });
const ulid = ulidFactory();

router
  .get(
    '/nodes/:uuid?',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      let stmt;
      if (typeof req.uuid === 'undefined') {
        stmt = `SELECT * from nodes;`;
      } else {
        stmt = `SELECT * from nodes WHERE uuid = ${req.uuid};`;
      }
      const data = (await env.DB.prepare(stmt).all()).results;

      return json(data ?? {}, { status: 200 });
    },
  )
  .post('/nodes', withContent, async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
    try {
      if (typeof req.content === 'undefined') {
        throw new Error('Execpted input is missing');
      } else {
        const params = req.content as EdgeNodePartial;
        await env.DB.prepare(
          `INSERT INTO nodes (uuid, hostname, domain, location_uuid) VALUES (
            '${ulid()}',
            '${params.hostname}',
            '${params.domain}',
            '${params.location_uuid}');`,
        ).run();
        return new Response(null, { status: 201 });
      }
    } catch (e: any) {
      return new Response(
        JSON.stringify({
          message: e.message,
          cause: e.cause,
        }),
        { status: 500 },
      );
    }
  })
  .delete(
    '/nodes/:uuid',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      try {
        if (typeof req.uuid === 'undefined') {
          throw new Error('Execpted input is missing');
        } else {
          await env.DB.prepare(`DELETE FROM nodes WHERE uuid = '${req.uuid}';`).run();
          return new Response(null, { status: 204 });
        }
      } catch (e: any) {
        return new Response(
          JSON.stringify({
            message: e.message,
            cause: e.cause,
          }),
          { status: 500 },
        );
      }
    },
  )
  .get(
    '/locations/:uuid?',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      let stmt;
      if (typeof req.uuid === 'undefined') {
        stmt = 'SELECT * from locations;';
      } else {
        stmt = `SELECT * from locations WHERE uuid = '${req.uuid}';`;
      }
      try {
        const data = (await env.DB.prepare(stmt).all()).results;
        return json(data ?? {}, { status: 200 });
      } catch (e: any) {
        error(500, { message: e.message, cause: e.cause });
      }
    },
  )
  .get(
    '/locations/:uuid/activate',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      console.log(req.uuid);
      const stmt = `SELECT * from locations WHERE uuid = '${req.uuid}';`;
      try {
        const data = (await env.DB.prepare(stmt).first()) as Location;
        if (typeof data === 'undefined' || Object.keys(data).length === 0) {
          return error(404, 'Record not found');
        } else if (!data.status) {
          await env.DB.prepare(
            `UPDATE locations SET status = '1' WHERE uuid = '${req.uuid}';`,
          ).run();
          return new Response(null, { status: 204 });
        } else {
          return json({ message: 'Location is already active' });
        }
      } catch (e: any) {
        return error(500, { message: e.message, cause: e.cause });
      }
    },
  )
  .get(
    '/locations/:uuid/deactivate',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      const stmt = `SELECT * from locations WHERE uuid = '${req.uuid}';`;
      try {
        const data = (await env.DB.prepare(stmt).first()) as Location;
        if (typeof data === 'undefined' || Object.keys(data).length === 0) {
          return error(404, 'Record not found');
        } else if (data.status) {
          await env.DB.prepare(
            `UPDATE locations SET status = '0' WHERE uuid = '${req.uuid}';`,
          ).run();
          return new Response(null, { status: 204 });
        } else {
          return json({ message: 'Location is already inactive' });
        }
      } catch (e: any) {
        return error(500, { message: e.message, cause: e.cause });
      }
    },
  )
  .post('/locations', withContent, async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
    try {
      if (typeof req.content === 'undefined') {
        throw new Error('Execpted input is missing');
      } else {
        const params = req.content as LocationPartial;
        await env.DB.prepare(
          `INSERT INTO locations (uuid, name, status) VALUES ('${ulid()}', '${params.name}', 1);`,
        ).run();
        return new Response(null, { status: 201 });
      }
    } catch (e: any) {
      return new Response(
        JSON.stringify({
          message: e.message,
          cause: e.cause,
        }),
        { status: 500 },
      );
    }
  })
  .delete(
    '/locations/:uuid',
    withParams,
    async (req: AppRequest, env: AppEnv, _ctx: ExecutionContext) => {
      const stmt = `SELECT * from locations WHERE uuid = '${req.uuid}';`;
      try {
        const data = (await env.DB.prepare(stmt).first()) as Location;
        if (typeof data === 'undefined' || Object.keys(data).length === 0) {
          return error(404, 'Record not found');
        } else if (data.status) {
          await env.DB.prepare(
            `UPDATE locations SET status = '0' WHERE uuid = '${req.uuid}';`,
          ).run();
          return new Response(null, { status: 204 });
        } else {
          return json({ message: 'Location is already inactive' });
        }
      } catch (e: any) {
        return error(500, { message: e.message, cause: e.cause });
      }
    },
  )
  .all('*', () => _404);

const worker: ExportedHandler<AppEnv> = {
  fetch: (...args) =>
    router.handle(...args).catch(async (err) => {
      console.error(err);
      return error(500, 'Internal Serverless Error');
    }),
};

export default worker;
