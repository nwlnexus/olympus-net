import type { AppEnv, AppRequest } from '~/types/env';
import { error, json, ThrowableRouter } from 'itty-router-extras';

const router = ThrowableRouter();

router
  .get('/locations', (_req: AppRequest, _env: AppEnv) => {
    return json({});
  })
  .get('/nodes', (_req: AppRequest, _env: AppEnv) => {
    return json({});
  })
  .get('/tunnels', (_req: AppRequest, _env: AppEnv) => {
    return json({});
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
