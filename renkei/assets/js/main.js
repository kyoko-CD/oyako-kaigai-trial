document.addEventListener('DOMContentLoaded', function () {

  // === Mobile Nav Toggle ===
  var navToggle = document.getElementById('navToggle');
  var siteNav = document.getElementById('siteNav');

  if (navToggle && siteNav) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      siteNav.classList.toggle('open');
    });

    siteNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        siteNav.classList.remove('open');
      });
    });
  }

  // === Mark current page in nav ===
  var currentFile = window.location.pathname.split('/').pop() || 'index.html';
  if (currentFile === '') currentFile = 'index.html';
  document.querySelectorAll('.site-nav a').forEach(function (link) {
    var linkFile = link.getAttribute('href').split('/').pop();
    if (linkFile === currentFile) link.classList.add('current');
  });

  // === Accordion ===
  document.querySelectorAll('.accordion-header').forEach(function (header) {
    header.addEventListener('click', function () {
      var body = this.nextElementSibling;
      var isOpen = this.classList.contains('open');
      this.classList.toggle('open', !isOpen);
      body.classList.toggle('open', !isOpen);
    });
  });

  // === Checklist with localStorage ===
  var checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');

  if (checkboxes.length > 0) {
    var STORAGE_KEY = 'boracay-checklist-v1';

    function loadState() {
      var saved;
      try { saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'); } catch (e) { saved = {}; }
      checkboxes.forEach(function (cb) {
        if (saved[cb.id]) {
          cb.checked = true;
          cb.closest('.checklist-item').classList.add('checked');
        }
      });
      updateProgress();
    }

    function saveState() {
      var state = {};
      checkboxes.forEach(function (cb) { state[cb.id] = cb.checked; });
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
    }

    function updateProgress() {
      var total = checkboxes.length;
      var checked = document.querySelectorAll('.checklist-item input:checked').length;

      var numEl = document.getElementById('totalChecked');
      var totEl = document.getElementById('totalItems');
      var fillEl = document.getElementById('progressFill');

      if (numEl) numEl.textContent = checked;
      if (totEl) totEl.textContent = total;
      if (fillEl) {
        fillEl.style.width = (total > 0 ? (checked / total * 100) : 0) + '%';
      }

      document.querySelectorAll('.checklist-category').forEach(function (cat) {
        var catCbs = cat.querySelectorAll('input[type="checkbox"]');
        var catChecked = cat.querySelectorAll('input:checked').length;
        var progEl = cat.querySelector('.cat-progress');
        if (progEl) progEl.textContent = catChecked + '/' + catCbs.length;
      });
    }

    checkboxes.forEach(function (cb) {
      cb.addEventListener('change', function () {
        this.closest('.checklist-item').classList.toggle('checked', this.checked);
        saveState();
        updateProgress();
      });
    });

    // Click on label or item row toggles checkbox
    document.querySelectorAll('.checklist-item').forEach(function (item) {
      item.querySelector('label').addEventListener('click', function (e) {
        e.preventDefault();
        var cb = item.querySelector('input[type="checkbox"]');
        cb.checked = !cb.checked;
        item.classList.toggle('checked', cb.checked);
        saveState();
        updateProgress();
      });
    });

    // Reset button
    var resetBtn = document.getElementById('resetChecklist');
    if (resetBtn) {
      resetBtn.addEventListener('click', function () {
        if (confirm('チェックをすべてリセットしますか？')) {
          checkboxes.forEach(function (cb) {
            cb.checked = false;
            cb.closest('.checklist-item').classList.remove('checked');
          });
          try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
          updateProgress();
        }
      });
    }

    // Print button
    var printBtn = document.getElementById('printChecklist');
    if (printBtn) {
      printBtn.addEventListener('click', function () { window.print(); });
    }

    loadState();
  }

  // === Back to Top ===
  var backBtn = document.getElementById('backToTop');
  if (backBtn) {
    window.addEventListener('scroll', function () {
      backBtn.classList.toggle('visible', window.scrollY > 400);
    });
    backBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
