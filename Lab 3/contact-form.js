/**
 * Formular contact (Lab 3): validare și mesaj de confirmare fără alert().
 */
(function () {
  'use strict';

  var form = document.getElementById('form-contact');
  if (!form) return;

  var err = document.getElementById('contact-errors');
  var overlay = document.getElementById('contact-success-overlay');
  var detail = document.getElementById('contact-success-detail');

  function showErr(msgs) {
    if (!err) return;
    if (!msgs.length) {
      err.style.display = 'none';
      err.innerHTML = '';
      return;
    }
    err.style.display = 'block';
    err.innerHTML =
      '<ul>' +
      msgs.map(function (m) {
        return '<li>' + m + '</li>';
      }).join('') +
      '</ul>';
  }

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var nume = (document.getElementById('cf-nume') || {}).value.trim();
    var email = (document.getElementById('cf-email') || {}).value.trim();
    var subj = (document.getElementById('cf-subiect') || {}).value.trim();
    var msg = (document.getElementById('cf-mesaj') || {}).value.trim();
    var msgs = [];

    if (!nume) msgs.push('Completați numele.');
    if (!email) msgs.push('Completați email-ul.');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msgs.push('Email invalid.');
    if (!subj) msgs.push('Indicați subiectul.');
    if (!msg || msg.length < 10) msgs.push('Mesajul trebuie să aibă cel puțin 10 caractere.');

    showErr(msgs);
    if (msgs.length) return;

    if (detail) {
      detail.innerHTML =
        '<p>Mulțumim, <strong>' +
        esc(nume) +
        '</strong>!</p>' +
        '<p>Am primit mesajul cu subiectul „<strong>' +
        esc(subj) +
        '</strong>”. Vă răspundem în cel mult <strong>30 de minute</strong> în timpul programului.</p>';
    }
    if (overlay) overlay.classList.add('show');
    form.reset();
    showErr([]);
  });
})();
