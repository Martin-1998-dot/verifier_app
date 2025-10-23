import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

// --- Supabase client setup ---
const supabaseUrl = 'https://nfixpojxelyrdxxqqvpb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maXhwb2p4ZWx5cmR4eHFxdnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjI0ODYsImV4cCI6MjA3NDI5ODQ4Nn0.X6GmWOzL6NBtKKBejHjf6xQuEBeiA40EOEs4uQt7Vxw'
export const supabase = createClient(supabaseUrl, supabaseKey)

// ==========================
// EMAIL/PASSWORD LOGIN
// ==========================
export async function loginWithEmail(email, password, expectedRole) {
    const { data: user, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.user.id)
        .single()
    if (profileError) throw profileError
    if (!profile || profile.role !== expectedRole) throw new Error(`Access denied: not a ${expectedRole}`)
    
    return user
}

// ==========================
// GOOGLE LOGIN
// ==========================
export async function loginWithGoogle(expectedRole) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: window.location.origin + '/auth-callback.html' }
    })
    if (error) throw error
    return data
}

// ==========================
// SIGN-UP WITH EMAIL/PASSWORD
// ==========================
export async function signUpWithEmail(email, password, role) {
    const { data: user, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error

    // Create profile with role
    const { error: profileError } = await supabase.from('profiles').insert([
        { id: user.user.id, role: role }
    ])
    if (profileError) throw profileError

    return user
}

// ==========================
// RESET PASSWORD
// ==========================
export async function resetPassword(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: window.location.origin + '/auth-callback.html'
    })
    if (error) throw error
    return data
}
