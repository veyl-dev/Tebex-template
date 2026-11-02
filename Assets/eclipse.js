(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-main-nav]');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }));
  }
  document.querySelectorAll('[data-copy-button]').forEach((button) => {
    button.addEventListener('click', async () => {
      const value = button.closest('.server-address')?.querySelector('[data-copy-value]')?.getAttribute('data-copy-value');
      if (!value) return;
      try {
        await navigator.clipboard.writeText(value);
        const oldLabel = button.textContent;
        button.textContent = 'COPIED';
        window.setTimeout(() => { button.textContent = oldLabel; }, 1400);
      } catch (_) {
        button.textContent = 'COPY FAILED';
      }
    });
  });
})();
