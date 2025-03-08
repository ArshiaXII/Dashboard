import { runMigrations } from '../lib/db';

async function main() {
  try {
    await runMigrations();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

main(); 