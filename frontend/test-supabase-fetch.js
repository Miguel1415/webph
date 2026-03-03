
async function testSupabase() {
    const supabaseUrl = process.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        console.error('Supabase credentials missing.');
        process.exit(1);
    }

    console.log('Testing Supabase connection with fetch...');
    console.log('URL:', supabaseUrl);

    try {
        const response = await fetch(`${supabaseUrl}/rest/v1/gallery_items?select=*&limit=1`, {
            headers: {
                'apikey': supabaseAnonKey,
                'Authorization': `Bearer ${supabaseAnonKey}`
            }
        });

        if (!response.ok) {
            const error = await response.json();
            console.error('Error connecting to Supabase:', error);
            process.exit(1);
        }

        const data = await response.json();
        console.log('Successfully connected to Supabase!');
        console.log(`Found ${data.length} item(s) in gallery_items.`);
        if (data.length > 0) {
            console.log('Sample item:', data[0]);
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        process.exit(1);
    }
}

testSupabase();
