import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

// --- Supabase connection ---
const supabaseUrl = 'https://nfixpojxelyrdxxqqvpb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maXhwb2p4ZWx5cmR4eHFxdnBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg3MjI0ODYsImV4cCI6MjA3NDI5ODQ4Nn0.X6GmWOzL6NBtKKBejHjf6xQuEBeiA40EOEs4uQt7Vxw';
const supabase = createClient(supabaseUrl, supabaseKey);

// Sidebar toggle
const menuBtn = document.getElementById('menuBtn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
    mainContent.classList.toggle('full');
});

// Sections definition
const sections = {
    company: ["Company Name","Company Registration Number / ID","Contact Person","Industry / Sector","Phone / Email","Address","Website / Social Media Links","Number of Employees"],
    property: ["Property Name / Title","Stand / Plot Number","Street / Address","Suburb / City / Province","Owner Full Name","Owner Contact Number","Owner Email","Property Type","Year Built","Number of Rooms / Units"],
    vehicle: ["Vehicle Make / Brand","Vehicle Model","Year of Manufacture","Registration Number / Plate Number","VIN","Color","Engine Number","Owner Full Name","Owner Email","Vehicle Type"],
    dna_sample: ["Sample ID","Sample Type","Donor Full Name","Donor Contact Number","Donor Email","Collection Date","Collected By","Laboratory Name / Code","Storage Location","Purpose / Test Type"],
    profession: ["Profession Name / Title","License / Certification Number","Practitioner Full Name","Practitioner Contact Number","Workplace / Organization Name","Workplace Address","Years of Experience","Specialization / Skills","Registration Authority"],
    scandal: ["Scandal/Incident Title","Date of Incident","People Involved","Description / Details","Location","Evidence Available","Status / Follow-up"]
};

let currentEditId = null;

// Sidebar links
document.querySelectorAll('#sidebar a').forEach(link => {
    link.addEventListener('click', async e => {
        e.preventDefault();
        const section = link.dataset.section;
        document.getElementById('section-title').innerText = link.textContent;

        Object.keys(sections).forEach(sec => {
            document.getElementById(sec+'-section').style.display='none';
        });

        const secDiv = document.getElementById(section+'-section');
        secDiv.innerHTML = '';
        const form = document.createElement('form');

        sections[section].forEach(q => {
            const label = document.createElement('label');
            label.textContent = q;
            const input = document.createElement('input');
            input.type='text';
            input.name = q.replace(/\s+/g,'_').toLowerCase();
            input.placeholder = q;
            input.required = true;
            form.appendChild(label);
            form.appendChild(input);
        });

        const btn = document.createElement('button');
        btn.textContent='Submit';
        btn.className='submit-btn';
        form.appendChild(btn);

        const table = document.createElement('table');
        secDiv.appendChild(form);
        secDiv.appendChild(table);
        secDiv.style.display='block';

        // Load existing records
        async function loadTable(){
            table.innerHTML='';
            const { data, error } = await supabase.from(section).select('*');
            if(error) return alert(error.message);

            if(data.length>0){
                const th = document.createElement('tr');
                Object.keys(data[0]).forEach(k=>{
                    const header = document.createElement('th');
                    header.textContent=k;
                    th.appendChild(header);
                });
                table.appendChild(th);

                data.forEach(row=>{
                    const tr = document.createElement('tr');
                    Object.keys(row).forEach(k=>{
                        const td = document.createElement('td');
                        td.textContent=row[k];
                        tr.appendChild(td);
                    });
                    tr.addEventListener('click', ()=>{
                        currentEditId = row.id;
                        Object.keys(row).forEach(key=>{
                            const input = form.querySelector(`[name="${key}"]`);
                            if(input) input.value = row[key];
                        });
                    });
                    table.appendChild(tr);
                });
            }
        }
        await loadTable();

        // Handle form submission
        form.addEventListener('submit', async e=>{
            e.preventDefault();
            const dataObj = Object.fromEntries(new FormData(form));

            try{
                if(currentEditId){
                    const { error } = await supabase.from(section).update(dataObj).eq('id', currentEditId);
                    if(error) throw error;
                    alert("Updated successfully!");
                    currentEditId = null;
                } else {
                    const { error } = await supabase.from(section).insert([ dataObj ]);
                    if(error) throw error;
                    alert("Submitted successfully!");
                }
                form.reset();
                await loadTable();
            }catch(err){
                alert("Error: "+err.message);
            }
        });
    });
});

// Logout button
document.getElementById('logoutBtn').addEventListener('click', ()=>{
    window.location.href='/verifier_signin.html';
});
