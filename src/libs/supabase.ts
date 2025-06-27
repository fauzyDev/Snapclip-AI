import { createClient } from '@supabase/supabase-js'
// import { SUPABASE_URL } from '@/config/env'
// import { SUPABASE_KEY } from '@/config/env'

const url = "https://dbyqgacjtdeucmngbgaj.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRieXFnYWNqdGRldWNtbmdiZ2FqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgxMzE0NTcsImV4cCI6MjA1MzcwNzQ1N30.zGJTyCN36tNZmMgblyM0ba948G7rnDL7y77KagkIuTU"

export const supabase = createClient(url, key);