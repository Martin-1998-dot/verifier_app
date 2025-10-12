document.addEventListener("DOMContentLoaded", () => {

  const sidebar=document.getElementById("sidebar");
  const menuBtn=document.getElementById("menuBtn");
  const sections=document.querySelectorAll(".section");
  const links=sidebar.querySelectorAll("a[data-section]");
  const sectionTitle=document.getElementById("section-title");
  const logoutSidebar=document.getElementById("logoutSidebar");

  const adminMenuBtn = document.getElementById("adminMenuBtn");
  const adminMenu = document.getElementById("adminMenu");
  let menuOpen = false;

  const dashboardTitle = document.getElementById("dashboardTitle");

  // Menu toggle
  menuBtn.addEventListener("click", ()=>{ 
    sidebar.classList.toggle("show"); 
    document.querySelector(".main").classList.toggle("shifted"); 
  });

  // Section switching via sidebar
  links.forEach(link=>{
    link.addEventListener("click",(e)=>{
      e.preventDefault();
      const target=link.dataset.section;
      sections.forEach(sec=>sec.style.display="none");
      const targetSection=document.getElementById(target+"-section");
      if(targetSection) targetSection.style.display="block";
      sectionTitle.textContent=link.textContent;
    });
  });

  // Dashboard top click
  dashboardTitle.addEventListener("click", ()=>{
    sections.forEach(sec => sec.style.display="none");
    const dashSection=document.getElementById("dashboard-section");
    if(dashSection) dashSection.style.display="block";
    sectionTitle.textContent="Dashboard Overview";
  });

  // Admin dropdown
  adminMenuBtn.addEventListener("click", ()=>{
    menuOpen = !menuOpen;
    adminMenu.style.display = menuOpen ? "block" : "none";
  });

  document.getElementById("logoutSidebar2").addEventListener("click", ()=>{
    localStorage.removeItem("isLoggedIn");
    window.location.href="index.html";
  });

  // Logout sidebar
  logoutSidebar.addEventListener("click", ()=>{
    localStorage.removeItem("isLoggedIn");
    window.location.href="index.html";
  });

  // ---------------- MODAL ----------------
  const modal=document.getElementById("confirmModal");
  const modalText=document.getElementById("modal-text");
  const modalConfirm=document.getElementById("modal-confirm");
  const modalCancel=document.getElementById("modal-cancel");
  let currentActionBtn=null;

  function showModal(btn, actionText){ 
    currentActionBtn=btn;
    modalText.textContent=`Are you sure you want to ${actionText}?`;
    modal.style.display="flex";
  }
  modalCancel.addEventListener("click", ()=>{ modal.style.display="none"; currentActionBtn=null; });

  function bindActionButtons(){
    document.querySelectorAll(".approve-btn").forEach(btn=>btn.addEventListener("click", ()=>showModal(btn,"approve this record")));
    document.querySelectorAll(".reject-btn").forEach(btn=>btn.addEventListener("click", ()=>showModal(btn,"reject this record")));
    document.querySelectorAll(".delete-btn").forEach(btn=>btn.addEventListener("click", ()=>showModal(btn,"delete this record")));
  }
  bindActionButtons();

  modalConfirm.addEventListener("click", ()=>{
    if(!currentActionBtn) return;
    const row = currentActionBtn.closest("tr");
    if(currentActionBtn.classList.contains("approve-btn")) row.querySelector("td:nth-child(4)").textContent="Approved";
    if(currentActionBtn.classList.contains("reject-btn")) row.querySelector("td:nth-child(4)").textContent="Rejected";
    if(currentActionBtn.classList.contains("delete-btn")) row.remove();
    modal.style.display="none";
    currentActionBtn=null;
  });

  // ---------------- ADD COMPANY ----------------
  const addCompanyBtn=document.getElementById("addCompanyBtn");
  const addCompanyModal=document.getElementById("addCompanyModal");
  const closeCompanyModal=document.getElementById("closeCompanyModal");
  const addCompanyForm=document.getElementById("addCompanyForm");
  const companiesTable=document.getElementById("companiesTable").querySelector("tbody");

  addCompanyBtn.addEventListener("click", ()=>{ addCompanyModal.style.display="flex"; });
  closeCompanyModal.addEventListener("click", ()=>{ addCompanyModal.style.display="none"; });
  addCompanyForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const id = document.getElementById("companyId").value.trim();
    const name = document.getElementById("companyName").value.trim();
    const type = document.getElementById("companyType").value.trim();
    const row = document.createElement("tr");
    row.innerHTML = `<td>${id}</td><td>${name}</td><td>${type}</td><td>Pending</td>
      <td>
        <button class="approve-btn">Approve</button>
        <button class="reject-btn">Reject</button>
        <button class="delete-btn">Delete</button>
      </td>`;
    companiesTable.appendChild(row);
    bindActionButtons();
    addCompanyModal.style.display="none";
    addCompanyForm.reset();
  });

});
