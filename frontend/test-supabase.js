import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing. Check your .env file.')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

async function testConnection() {
    console.log('Testing Supabase connection...')
    console.log('URL:', supabaseUrl)
    
    try {
        const { data, error } = await supabase
            .from('gallery_items')
            .select('*', { count: 'exact', head: true })
        
        if (error) {
            console.error('Error connecting to gallery_items table:', error.message)
            if (error.code === '42P01') {
                console.log('Suggestion: The table "gallery_items" does not exist in your database.')
            }
        } else {
            console.log('Successfully connected to Supabase!')
            console.log('Table "gallery_items" found.')
        }

        // Try to fetch one row to see if there's data
        const { data: rows, error: rowError } = await supabase
            .from('gallery_items')
            .select('*')
            .limit(1)
        
        if (rowError) {
            console.error('Error fetching data:', rowError.message)
        } else {
            console.log(`Table has ${rows.length > 0 ? 'some' : 'no'} data.`)
            if (rows.length > 0) {
                console.log('Sample item:', rows[0])
            }
        }

    } catch (err) {
        console.error('Unexpected error:', err)
    }
}

testConnection()
