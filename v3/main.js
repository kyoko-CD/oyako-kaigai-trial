/**
 * main.js — スクロールフェードイン
 */
(function () {
  'use strict';

  var TARGETS = [
    '.hero__label', '.hero__h', '.hero__sub', '.hero__cta',
    '.eyebrow',
    '.voice__verse',
    '.core__main', '.core__rule', '.core__sub',
    '.ch__num', '.ch__title', '.prose',
    '.why__lead', '.why__frags', '.why__close',
    '.take__card',
    '.flow__step',
    '.undecided__title', '.undecided__prose',
    '.cta-block__lead', '.cta-block__note',
    '.sechd__title',
    '.faq__item',
  ].join(', ');

  function init() {
    if (!('IntersectionObserver' in window)) return;

    var els = document.querySelectorAll(TARGETS);

    els.forEach(function (el) {
      el.classList.add('js-fade');
    });

    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -36px 0px' });

    els.forEach(function (el) { obs.observe(el); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
