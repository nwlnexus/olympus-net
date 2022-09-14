import type { AppEnv, AppRequest } from '~/types/env';
import { error, ThrowableRouter } from 'itty-router-extras';

const router = ThrowableRouter();

router
  .all('*', () => {
    return error(404, 'Not found');
  });

const worker: ExportedHandler<AppEnv> = {
  fetch: (...args) =>
    router.handle(...args).then((response) => {
      return response;
    }),
};

export default worker;
