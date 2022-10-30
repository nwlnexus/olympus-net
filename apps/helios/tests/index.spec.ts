import { describe, beforeAll, expect, it } from 'vitest';
import worker from '../src/index';
const env = getMiniflareBindings();
const ctx = new ExecutionContext();

beforeAll(async () => {
  await env.DB.exec(
    'CREATE TABLE nodes(\n' +
      '  UUID TEXT NOT NULL,\n' +
      '  HOSTNAME TEXT,\n' +
      '  NODE_DOMAIN TEXT,\n' +
      '  LOC_UUID TEXT,\n' +
      '  PRIMARY KEY (UUID),\n' +
      '  UNIQUE (UUID),\n' +
      '  UNIQUE (HOSTNAME),\n' +
      '  FOREIGN KEY (LOC_UUID) REFERENCES locations(UUID)\n' +
      ');'
  );
});

describe('with D1', () => {
  it('should respond', async () => {
    const req = new Request('https://localhost:8088/nodes');
    const res = await worker.fetch(req, env, ctx);
    expect(await res.json()).toBe('[]');
  });
});
