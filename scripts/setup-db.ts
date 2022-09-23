import Database = require('better-sqlite3');

console.log('✨ Preparing to setup the database...');
const db = new Database('./.wrangler/d1/DB.sqlite3');
