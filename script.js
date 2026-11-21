'use strict';

// ── Sidebar toggle (mobile "Show Contacts") ───────────────
const sidebar    = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));


// ── Navbar page navigation ────────────────────────────────
const navLinks = document.querySelectorAll('[data-nav-link]');
const pages    = document.querySelectorAll('[data-page]');

navLinks.forEach(link => {
  link.addEventListener('click', function () {
    const clicked = this.innerText.trim().toLowerCase();

    pages.forEach(page => {
      if (page.dataset.page === clicked) {
        page.classList.add('active');
      } else {
        page.classList.remove('active');
      }
    });

    navLinks.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
    window.scrollTo(0, 0);
  });
});


// ── Project filter ────────────────────────────────────────
const selectBox   = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtns  = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

if (selectBox) {
  selectBox.addEventListener('click', () => selectBox.classList.toggle('active'));
}

function filterProjects(val) {
  filterItems.forEach(item => {
    const match = val === 'all' || item.dataset.category === val;
    item.classList.toggle('active', match);
  });
}

selectItems.forEach(item => {
  item.addEventListener('click', function () {
    const val = this.innerText.trim().toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText.trim();
    if (selectBox)  selectBox.classList.remove('active');
    filterProjects(val);
  });
});

let activeFilterBtn = filterBtns[0];
filterBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    const val = this.innerText.trim().toLowerCase();
    if (selectValue) selectValue.innerText = this.innerText.trim();
    filterProjects(val);
    activeFilterBtn.classList.remove('active');
    this.classList.add('active');
    activeFilterBtn = this;
  });
});


// ── Contact form validation ───────────────────────────────
const form       = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn    = document.querySelector('[data-form-btn]');
const formMsg    = document.getElementById('formMsg');

formInputs.forEach(input => {
  input.addEventListener('input', () => {
    formBtn.disabled = !form.checkValidity();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  formMsg.textContent = '✅ Message sent! I\'ll get back to you soon.';
  formBtn.disabled = true;
  form.reset();
  // re-disable after reset since inputs are now empty
  formBtn.disabled = true;
  setTimeout(() => { formMsg.textContent = ''; }, 4000);
});
