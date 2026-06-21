import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('your-project-id')) {
  console.log('Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local first');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);
const DATA_DIR = join(__dirname, '..', 'data');

const collections = [
  'menu', 'specials', 'leads', 'feedback', 'orders',
  'loyalty', 'loyalty_transactions', 'gallery', 'contacts',
];

async function seed() {
  for (const collection of collections) {
    const filePath = join(DATA_DIR, `${collection}.json`);
    if (!existsSync(filePath)) continue;

    const data = JSON.parse(readFileSync(filePath, 'utf-8'));
    if (!data.length) continue;

    const { error } = await supabase.from(collection).insert(data);
    if (error) {
      console.error(`Error seeding ${collection}:`, error.message);
    } else {
      console.log(`Seeded ${collection}: ${data.length} rows`);
    }
  }
  console.log('Done!');
}

seed();
