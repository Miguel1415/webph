
import { createClient } from '@supabase/supabase-js'
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, './.env');

const getEnv = () => {
    try {
        const content = fs.readFileSync(envPath, 'utf-8');
        const env = {};
        content.split(/\r?\n/).forEach(line => {
            const l = line.trim();
            if (l && !l.startsWith('#') && l.includes('=')) {
                const [k, ...v] = l.split('=');
                env[k.trim()] = v.join('=').trim();
            }
        });
        return env;
    } catch (e) {
        console.error('Error leyendo .env:', e.message);
        process.exit(1);
    }
};

const env = getEnv();
const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY } = env;

const supabase = createClient(VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY);

async function checkHeroItems() {
    console.log('--- Checking Hero Items ---');
    const { data, error } = await supabase
        .from('gallery_items')
        .select('*')
        .eq('is_hero', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching hero items:', error);
        return;
    }

    console.log(`Found ${data.length} hero items.`);
    data.forEach((item, index) => {
        console.log(`${index + 1}: [${item.id}] ${item.title} - ${item.image_url}`);
    });
}

checkHeroItems();
