import { createClient } from '@supabase/supabase-js'

// 1. URL dự án của bạn
const supabaseUrl = 'https://hkqcqwiirdztuztvhoml.supabase.co'

// 2. Anon Key (ey...) bạn đã lấy được
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhrcWNxd2lpcmR6dHV6dHZob21sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkxNzM2OTYsImV4cCI6MjA4NDc0OTY5Nn0.4NDABJ17I0oOnujxKyRmaPiFqY4z6kY5poId9JTaI2I'

// 3. Khởi tạo và xuất (export) biến supabase để các trang khác sử dụng
export const supabase = createClient(supabaseUrl, supabaseAnonKey)