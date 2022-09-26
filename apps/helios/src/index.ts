import { error, ThrowableRouter, withContent, withParams } from 'itty-router-extras';
import { createLocation, getLocations, getNodes, getTunnels } from './handlers';
import type { AppEnv, AppRequest } from '~/types/env';

const router = ThrowableRouter();

router
  .get('/locations', withParams, (req: AppRequest, env: AppEnv, ctx: ExecutionContext) => {
    return getLocations(req, env, ctx);
  })
  .post('/locations', withContent, (req: AppRequest, env: AppEnv, ctx: ExecutionContext) => {
    return createLocation(req, env, ctx);
  })
  .get('/nodes/:uuid?', withParams, (req: AppRequest, env: AppEnv, ctx: ExecutionContext) => {
    return getNodes(req, env, ctx);
  })
  .get('/tunnels', (req: AppRequest, env: AppEnv, ctx: ExecutionContext) => {
    return getTunnels(req, env, ctx);
  })
  .all('*', () => {
    return error(404, 'Not found');
  });

const worker: ExportedHandler<AppEnv> = {
  fetch: (...args) =>
    router.handle(...args).then(response => {
      return response;
    })
};

export default worker;
