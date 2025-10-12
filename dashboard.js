import { addData, updateData, deleteData, onDataChange } from './firestore.js';

// Sidebar toggle
const sidebar = document.getElementById('sidebar');
const menuBtn = document.getElementById('menuBtn');
menuBtn.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Sections & verifier questions
const sections = {
  company: [
    "Company Name", "Company Registration Number / ID", "Contact Person", "Industry / Sector",
    "Phone / Email", "Address", "Website / Social Media Links", "Number of Employees"
  ],
  property: [
    "Property Name / Title", "Stand / Plot Number", "Street / Address", "Suburb / City / Province",
    "Owner Full Name", "Owner Contact Number", "Owner Email", "Property Type", "Year Built", "Number of Rooms / Units"
  ],
  vehicle: [
    "Vehicle Make / Brand", "Vehicle Model", "Year of Manufacture", "Registration Number / Plate Number",
    "VIN", "Color", "Engine Number", "Owner Full Name", "Owner Email", "Vehicle Type"
  ],
  dna: [
    "Sample ID", "Sample Type", "Donor Full Name", "Donor Contact Number", "Donor Email",
    "Collection Date", "Collected By", "Laboratory Name / Code", "Storage Location", "Purpose / Test Type"
  ],
  profession: [
    "Profession Name / Title", "License / Certification Number", "Practitioner Full Name",
    "Practitioner Contact Number", "Workplace / Organization Name", "Workplace Address",
    "Years of Experience", "Specialization / Skills", "Registration Authority"
  ],
  scandal: [
    "Scandal/Incident Title", "Date of Incident", "People Involved", "Description / Details",
    "Location", "Evidence Available", "Status / Follow-up"
  ]
};

// Render section questions
function renderQuestions(section) {
  const content = document.getElementById('section-content');
  content.innerHTML = '';
  const fields = sections[section];
  fields.forEach(f => {
    const label = document.createElement('label');
    label.textContent = f;
    const input = document.createElement('input');
    input.type = 'text';
    input.name = f.replace(/\s+/g,'_').toLowerCase();
    input.placeholder = f;
    content.appendChild(label);
    content.appendChild(input);
    content.appendChild(document.createElement('br'));
  });
  const btn = document.createElement('button');
  btn.textContent = 'Submit';
  btn.onclick = () => {
    const inputs = content.querySelectorAll('input');
    const data = {};
    inputs.forEach(i => data[i.name] = i.value);
    addData(section, data).then(()=> alert('Submitted!'));
  };
  content.appendChild(btn);
}

// Sidebar clicks
document.querySelectorAll('#sidebar a').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const section = link.dataset.section;
    document.getElementById('section-title').innerText = link.textContent;
    renderQuestions(section);
  });
});
