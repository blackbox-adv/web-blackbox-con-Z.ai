
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

async function main() {
  const projectName = 'web-blackbox-con-Z.ai';

  try {
    await sql`CREATE DATABASE ${projectName}_prod`;
    console.log(`Successfully created production database for ${projectName}`);
  } catch (error) {
    console.error('Error creating production database:', error);
  }
}

main();
