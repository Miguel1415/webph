import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const envPath = path.resolve(__dirname, '../.env');

// Parse .env manual sin dependencias
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
const { VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = env;

// Usamos la clave de servicio si está disponible, sino la anónima
const AUTH_KEY = SUPABASE_SERVICE_ROLE_KEY || VITE_SUPABASE_ANON_KEY;

const BASE_DIR = path.resolve(__dirname, '../public/assets/images');

const categoryMapping = {
    'carrousel': { category: 'paisajes', is_carousel: true },
    'Galeria/paisajes': { category: 'paisajes' },
    'Galeria/fauna': { category: 'fauna' },
    'Galeria/sesiones': { category: 'sesiones' },
    'bodas': { category: 'bodas' },
    'deportiva/across andes': { category: 'deportiva', subcategory: 'across-andes' },
    'deportiva/bici': { category: 'deportiva', subcategory: 'bike' },
    'deportiva/rally': { category: 'deportiva', subcategory: 'rally' },
    'deportiva/trail': { category: 'deportiva', subcategory: 'trail' }
};

async function uploadFile(filePath, remotePath) {
    const fileContent = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = ext === '.png' ? 'image/png' : 'image/jpeg';

    const response = await fetch(`${VITE_SUPABASE_URL}/storage/v1/object/gallery/${remotePath}`, {
        method: 'POST',
        headers: {
            'apikey': AUTH_KEY,
            'Authorization': `Bearer ${AUTH_KEY}`,
            'Content-Type': contentType,
            'x-upsert': 'true'
        },
        body: fileContent
    });

    if (!response.ok) {
        console.error(`Error subiendo ${remotePath}:`, await response.text());
        return null;
    }
    return `${VITE_SUPABASE_URL}/storage/v1/object/public/gallery/${remotePath}`;
}

async function insertToDB(data) {
    // Si ya existe, actualizamos si es Hero o no
    const checkRes = await fetch(`${VITE_SUPABASE_URL}/rest/v1/gallery_items?image_url=eq.${encodeURIComponent(data.image_url)}`, {
        headers: {
            'apikey': AUTH_KEY,
            'Authorization': `Bearer ${AUTH_KEY}`
        }
    });
    
    if (checkRes.ok) {
        const existing = await checkRes.json();
        if (existing.length > 0) {
            if (existing[0].is_hero !== data.is_hero) {
                // Actualizar is_hero
                await fetch(`${VITE_SUPABASE_URL}/rest/v1/gallery_items?id=eq.${existing[0].id}`, {
                    method: 'PATCH',
                    headers: {
                        'apikey': AUTH_KEY,
                        'Authorization': `Bearer ${AUTH_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ is_hero: data.is_hero })
                });
                console.log(`  - Actualizado Hero: ${data.title}`);
            } else {
                console.log(`  - Ya existe en DB: ${data.title}`);
            }
            return;
        }
    }

    const response = await fetch(`${VITE_SUPABASE_URL}/rest/v1/gallery_items`, {
        method: 'POST',
        headers: {
            'apikey': AUTH_KEY,
            'Authorization': `Bearer ${AUTH_KEY}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) console.error(`Error DB para ${data.title}:`, await response.text());
}

async function sync() {
    console.log('--- Iniciando Sincronización ---');
    for (const [folder, config] of Object.entries(categoryMapping)) {
        const localPath = path.join(BASE_DIR, folder);
        if (!fs.existsSync(localPath)) continue;

        const files = fs.readdirSync(localPath).filter(f => f.match(/\.(jpg|jpeg|png)$/i));
        console.log(`\nDirectorio: ${folder} (${files.length} archivos)`);

        for (const [idx, file] of files.entries()) {
            const fullPath = path.join(localPath, file);
            const remotePath = `${folder}/${file}`.replace(/[\s\(\)]/g, '_');
            
            console.log(`[${idx+1}/${files.length}] Procesando ${file}...`);
            const url = await uploadFile(fullPath, remotePath);
            if (url) {
                await insertToDB({
                    title: file.split('.')[0].replace(/_/g, ' ').toUpperCase(),
                    image_url: url,
                    category: config.category,
                    subcategory: config.subcategory || null,
                    display_order: idx,
                    is_hero: config.is_carousel || (idx < 2 && config.category === 'paisajes' && !Object.values(categoryMapping).some(m => m.is_carousel))
                });
            }
        }
    }
    console.log('\n--- Sincronización Exitosa ---');
}

sync();
