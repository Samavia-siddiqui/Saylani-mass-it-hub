document.addEventListener('DOMContentLoaded', () => {
    init();
});

function init() {
    // Load data
    if (document.getElementById('totalReports')) updateDashboardStats();
    if (document.getElementById('lostList')) renderLostItems();
    if (document.getElementById('compTableBody')) renderComplaints();
    if (document.getElementById('volList')) renderVolunteers();

    // Form listeners
    setupForm('lostForm', 'lostItems', renderLostItems);
    setupForm('compForm', 'complaints', renderComplaints);
    setupForm('volForm', 'volunteers', renderVolunteers);
}

function setupForm(formId, storageKey, renderFn) {
    const form = document.getElementById(formId);
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let data = JSON.parse(localStorage.getItem(storageKey)) || [];
        const entry = {};

        if (formId === 'lostForm') {
            entry.title = document.getElementById('lostTitle').value;
            entry.desc = document.getElementById('lostDesc').value;
            entry.status = 'Pending';
        }

        if (formId === 'compForm') {
            entry.title = document.getElementById('compTitle').value;
            entry.category = document.getElementById('compCategory').value;
            entry.status = 'Submitted';
        }

        if (formId === 'volForm') {
            entry.name = document.getElementById('volName').value;
            entry.event = document.getElementById('volEvent').value;
        }

        data.push(entry);
        localStorage.setItem(storageKey, JSON.stringify(data));
        form.reset();
        renderFn();
        updateDashboardStats();
    });
}

//////////////////////////////
// Render Functions
//////////////////////////////

function renderLostItems() {
    const items = JSON.parse(localStorage.getItem('lostItems')) || [];
    const container = document.getElementById('lostList');
    if (!container) return;

    container.innerHTML = items.map(i => `
    <div class="col-md-6">
      <div class="card p-3">
        <h6>${i.title}</h6>
        <p class="small text-muted">${i.desc}</p>
        <span class="badge bg-warning text-dark">Pending</span>
      </div>
    </div>
  `).join('');
}

function renderComplaints() {
    const items = JSON.parse(localStorage.getItem('complaints')) || [];
    const container = document.getElementById('compTableBody');
    if (!container) return;

    container.innerHTML = items.map(i => `
    <tr>
      <td>${i.title}</td>
      <td>${i.category}</td>
      <td><span class="badge bg-info text-dark">Submitted</span></td>
    </tr>
  `).join('');
}

function renderVolunteers() {
    const items = JSON.parse(localStorage.getItem('volunteers')) || [];
    const container = document.getElementById('volList');
    if (!container) return;

    container.innerHTML = items.map(v => `
    <li class="list-group-item">
      ${v.name} — <strong>${v.event}</strong>
    </li>
  `).join('');
}

//////////////////////////////
// Dashboard Stats
//////////////////////////////

function updateDashboardStats() {
    const lostCount = (JSON.parse(localStorage.getItem('lostItems')) || []).length;
    const compCount = (JSON.parse(localStorage.getItem('complaints')) || []).length;
    const volCount = (JSON.parse(localStorage.getItem('volunteers')) || []).length;

    if (document.getElementById('totalReports'))
        document.getElementById('totalReports').innerText = lostCount + compCount;

    if (document.getElementById('activeComplaints'))
        document.getElementById('activeComplaints').innerText = compCount;

    if (document.getElementById('totalVolunteers'))
        document.getElementById('totalVolunteers').innerText = volCount;
}

// renderVolunteers()
// {
//     const items = JSON.parse(localStorage.getItem('volunteers')) || []; const container =
//         document.getElementById('volList'); if (!container) return; container.innerHTML = items.map(v => ` <tr>
//     <td class="fw-bold text-dark">${v.name}</td>
//     <td>${v.event}</td>
//     <td><span class="text-muted">${v.availability || 'Not specified'}</span></td>
//     <td><span class="badge bg-success">Registered</span></td>
// </tr> `).join('');
// }

 document.getElementById('authForm').addEventListener('submit', function(e) { e.preventDefault(); });

// LOGIN SYSTEM
const authForm = document.getElementById('authForm');

if (authForm) {
  authForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // simple demo login
    if (email && password) {
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index.html'; // dashboard
    }
  });
}

// protect pages
if (!window.location.pathname.includes('login.html')) {
  if (localStorage.getItem('isLoggedIn') !== 'true') {
    window.location.href = 'login.html';
  }
}


if (formId === 'volForm') {
  entry.name = document.getElementById('volName').value;
  entry.event = document.getElementById('volEvent').value;
  entry.availability = document.getElementById('volAvailability').value; // ADD THIS
}

if(items.length === 0){
  container.innerHTML = `<p class="text-muted">No items reported yet.</p>`;
  return;
}
if(items.length === 0){
  container.innerHTML = `<tr><td colspan="4" class="text-muted text-center">No volunteers yet</td></tr>`;
  return;
}

function logout() {
  localStorage.removeItem('isLoggedIn');
  window.location.href = 'login.html';
}