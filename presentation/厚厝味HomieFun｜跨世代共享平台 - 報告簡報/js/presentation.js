(() => {
  'use strict';

  const root = document.documentElement;
  root.classList.add('js-enabled');

  const shell = document.getElementById('presentationShell');
  const deck = document.getElementById('deck');
  const slides = Array.from(document.querySelectorAll('.slide'));
  const prevButton = document.getElementById('prevButton');
  const nextButton = document.getElementById('nextButton');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const printButton = document.getElementById('printButton');
  const currentPage = document.getElementById('currentPage');
  const totalPages = document.getElementById('totalPages');
  const progressBar = document.getElementById('progressBar');

  if (!shell || !deck || slides.length === 0) {
    console.warn('Presentation initialization skipped: required elements are missing.');
    return;
  }

  const LOGICAL_WIDTH = 1600;
  const LOGICAL_HEIGHT = 900;
  const CONTROL_SAFE_AREA = 74;
  let currentIndex = 0;

  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  const indexFromHash = () => {
    const match = window.location.hash.match(/^#slide-(\d+)$/);
    if (!match) return 0;
    return clamp(Number(match[1]) - 1, 0, slides.length - 1);
  };

  const updateScale = () => {
    const availableWidth = Math.max(window.innerWidth - 28, 320);
    const availableHeight = Math.max(window.innerHeight - CONTROL_SAFE_AREA - 22, 180);
    const scale = Math.min(availableWidth / LOGICAL_WIDTH, availableHeight / LOGICAL_HEIGHT);

    deck.style.transform = `translate(-50%, -50%) scale(${scale})`;
    deck.style.top = `calc(50% - ${CONTROL_SAFE_AREA / 4}px)`;
  };

  const setSlide = (index, options = {}) => {
    const nextIndex = clamp(index, 0, slides.length - 1);
    currentIndex = nextIndex;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === nextIndex);
      slide.classList.toggle('is-before', slideIndex < nextIndex);
      slide.setAttribute('aria-hidden', slideIndex === nextIndex ? 'false' : 'true');
    });

    if (currentPage) currentPage.textContent = String(nextIndex + 1);
    if (totalPages) totalPages.textContent = String(slides.length);
    if (progressBar) progressBar.style.width = `${((nextIndex + 1) / slides.length) * 100}%`;
    if (prevButton) prevButton.disabled = nextIndex === 0;
    if (nextButton) nextButton.disabled = nextIndex === slides.length - 1;

    document.title = `${String(nextIndex + 1).padStart(2, '0')}｜${slides[nextIndex].dataset.slideTitle || '厚厝味'}｜厚厝味`;

    if (!options.skipHash) {
      const newHash = `#slide-${nextIndex + 1}`;
      if (window.location.hash !== newHash) {
        history.replaceState(null, '', newHash);
      }
    }
  };

  const next = () => setSlide(currentIndex + 1);
  const previous = () => setSlide(currentIndex - 1);

  const isFormControl = (target) => {
    if (!(target instanceof Element)) return false;
    return Boolean(target.closest('input, textarea, select, button, [contenteditable="true"]'));
  };

  const onKeydown = (event) => {
    if (isFormControl(event.target) && event.key !== 'Escape') return;

    switch (event.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        event.preventDefault();
        next();
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        event.preventDefault();
        previous();
        break;
      case 'Home':
        event.preventDefault();
        setSlide(0);
        break;
      case 'End':
        event.preventDefault();
        setSlide(slides.length - 1);
        break;
      default:
        break;
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await shell.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.warn('Fullscreen request was not completed.', error);
    }
  };

  const updateFullscreenLabel = () => {
    if (!fullscreenButton) return;
    fullscreenButton.textContent = document.fullscreenElement ? '離開全螢幕' : '全螢幕';
  };

  prevButton?.addEventListener('click', previous);
  nextButton?.addEventListener('click', next);
  fullscreenButton?.addEventListener('click', toggleFullscreen);
  printButton?.addEventListener('click', () => window.print());
  window.addEventListener('resize', updateScale, { passive: true });
  window.addEventListener('hashchange', () => setSlide(indexFromHash(), { skipHash: true }));
  document.addEventListener('keydown', onKeydown);
  document.addEventListener('fullscreenchange', updateFullscreenLabel);

  currentIndex = indexFromHash();
  updateScale();
  setSlide(currentIndex, { skipHash: false });
  updateFullscreenLabel();
})();




// (() => {
//   const root = document.documentElement;
//   const deck = document.querySelector('.deck');
//   const slides = Array.from(document.querySelectorAll('.slide'));
//   const current = document.getElementById('currentPage');
//   const total = document.getElementById('totalPages');
//   const progress = document.getElementById('progressBar');
//   const prev = document.getElementById('prevButton');
//   const next = document.getElementById('nextButton');
//   const fs = document.getElementById('fullscreenButton');
//   const printBtn = document.getElementById('printButton');
//   if (!deck || !slides.length) return;
//   root.classList.add('js-enabled');
//   let index = 0;
//   if (total) total.textContent = String(slides.length);
//   function fit() {
//     const sw = 1600, sh = 900;
//     const scale = Math.min(window.innerWidth / sw, window.innerHeight / sh);
//     deck.style.transform = `translate(-50%, -50%) scale(${scale})`;
//   }
//   function show(i) {
//     index = Math.max(0, Math.min(i, slides.length - 1));
//     slides.forEach((s, idx) => {
//       s.classList.toggle('is-active', idx === index);
//       s.classList.toggle('is-before', idx < index);
//     });
//     if (current) current.textContent = String(index + 1);
//     if (progress) progress.style.width = `${((index + 1) / slides.length) * 100}%`;
//   }
//   function go(delta) { show(index + delta); }
//   prev?.addEventListener('click', () => go(-1));
//   next?.addEventListener('click', () => go(1));
//   fs?.addEventListener('click', () => {
//     if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
//     else document.exitFullscreen?.();
//   });
//   printBtn?.addEventListener('click', () => window.print());
//   window.addEventListener('resize', fit);
//   window.addEventListener('keydown', (e) => {
//     const map = { ArrowRight: 1, PageDown: 1, ArrowLeft: -1, PageUp: -1 };
//     if (e.key in map) { e.preventDefault(); go(map[e.key]); }
//     if (e.key === 'Home') { e.preventDefault(); show(0); }
//     if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
//   });
//   fit(); show(0);
// })();
