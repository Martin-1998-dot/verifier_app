	mport { supabase } from './auth-connector.js';
import { setupModal, setupAddForm } from './modal.js';

// Check user authentication
async function checkAuth() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error || !user) {
        alert("Not authenticated.");
        window.location.href = "index.html";
        return;
    }
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (!profile || profile.role !== 'admin') {
        alert("Access denied.");
        window.location.href = "index.html";
    }
}
checkAuth();

// Logout button
document.getElementById('logoutBtn').addEventListener('click', async () => {
    await supabase.auth.signOut();
    window.location.href = 'index.html';
});

// Modal & Add Company form
setupModal('openCompanyModalBtn', 'addCompanyModal');
setupAddForm('addCompanyForm', 'companyTable', ['companyID', 'companyName']);
