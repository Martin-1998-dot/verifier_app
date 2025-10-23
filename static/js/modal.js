// modal.js

// Function to setup modals
function setupModal(openBtnId, modalId) {
    const modal = document.getElementById(modalId);
    const openBtn = document.getElementById(openBtnId);
    const closeBtn = modal.querySelector('.close');

    if (!modal || !openBtn || !closeBtn) return;

    // Open modal
    openBtn.onclick = () => {
        modal.style.display = 'block';
    };

    // Close modal
    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };

    // Close modal when clicking outside content
    window.addEventListener('click', e => {
        if (e.target === modal) modal.style.display = 'none';
    });
}

// Setup all modals
setupModal('openCompanyModalBtn', 'addCompanyModal');
setupModal('openPropertyModalBtn', 'addPropertyModal');
setupModal('openVehicleModalBtn', 'addVehicleModal');
setupModal('openSampleModalBtn', 'addSampleModal');
setupModal('openUserModalBtn', 'addUserModal');
setupModal('openProfessionModalBtn', 'addProfessionModal');

// Function to handle adding records to table
function setupAddForm(formId, tableId, fields) {
    const form = document.getElementById(formId);
    form.onsubmit = e => {
        e.preventDefault();
        const table = document.getElementById(tableId).querySelector('tbody');
        const row = document.createElement('tr');

        // Build table cells from form fields
        let html = '';
        fields.forEach(f => {
            html += `<td>${form[f].value || ''}</td>`;
        });

        // Status & Actions
        const status = form['status'] ? form['status'].value : 'pending';
        html += `<td class="${status}">${status.charAt(0).toUpperCase() + status.slice(1)}</td>`;
        html += `
            <td>
                <button class="approveBtn">Approve</button>
                <button class="rejectBtn">Reject</button>
                <button class="deleteBtn">Delete</button>
            </td>
        `;
        row.innerHTML = html;
        row.className = status;
        table.appendChild(row);

        // Buttons functionality
        row.querySelector('.approveBtn').onclick = () => {
            row.cells[row.cells.length - 2].textContent = 'Approved';
            row.className = 'approved';
        };
        row.querySelector('.rejectBtn').onclick = () => {
            row.cells[row.cells.length - 2].textContent = 'Rejected';
            row.className = 'rejected';
        };
        row.querySelector('.deleteBtn').onclick = () => row.remove();

        // Reset form and close modal
        form.reset();
        form.closest('.modal').style.display = 'none';
    };
}

// Setup all forms
setupAddForm('addCompanyForm', 'companyTable', ['companyID', 'companyName']);
setupAddForm('addPropertyForm', 'propertyTable', ['propertyID', 'propertyName', 'ownerName', 'ownerID', 'stand', 'purchaseDate']);
setupAddForm('addVehicleForm', 'vehicleTable', ['vehicleID', 'vehicleType', 'ownerName', 'ownerID', 'makeModel', 'year']);
setupAddForm('addSampleForm', 'sampleTable', ['sampleID', 'personName', 'type', 'dateCollected']);
setupAddForm('addUserForm', 'userTable', ['userID', 'fullName', 'emailPhone', 'role']);
setupAddForm('addProfessionForm', 'professionTable', ['professionID', 'professionName']);
