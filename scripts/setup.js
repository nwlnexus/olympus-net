#!/usr/bin/env node
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs');
const fs = require('fs');
const { cmd } = require('auto-changelog-2/src/utils');

// eslint-disable-next-line no-unused-expressions
yargs(hideBin(process.argv))
  .scriptName('setup')
  .command(
    'db',
    'Prepare the db.',
    yargs => {
      yargs.options({
        file: { type: 'string', demandOption: true, alias: 'f' },
        'db-path': { type: 'string', demandOption: true, alias: 'p' }
      });
    },
    yargs => dbFunctions(yargs)
  )
  .demandCommand()
  .help()
  .version('1.0.0')
  .alias('h', 'help').argv;

function dbFunctions(argv) {
  console.log('✨ Preparing to setup the DB...');
  try {
    const file = fs.readFileSync(argv.file).toString();
    const cmdArr = file
      .trim()
      .split(';')
      .filter(e => {
        return e;
      });
    const db = require('better-sqlite3')(argv.dbPath);
    for (const cmd of cmdArr) {
      const stmt = db.prepare(cmd);
      console.log(stmt);
      const result = stmt.run();
      console.log(result);
    }
  } catch (e) {
    console.log(e.message);
  }
}
