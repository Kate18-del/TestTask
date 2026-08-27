document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const testBanner = document.querySelector('.test-banner');
  const closeBanner = document.querySelector('.test-banner__close');
  const staffButton = document.querySelector('#staff-button');
  const modal = document.querySelector('#modal');

  // Скролл
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Мобильное меню
  menuButton.addEventListener('click', () => {
    const opened = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!opened));
    mobileNav.classList.toggle('is-open', !opened);
    mobileNav.setAttribute('aria-hidden', String(opened));
    document.body.classList.toggle('menu-open', !opened);
  });

  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('is-open');
      mobileNav.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('menu-open');
    });
  });

  // Закрытие баннера
  closeBanner.addEventListener('click', () => {
    testBanner.hidden = true;
  });

  // Анимация появления (reveal)
  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Модальное окно
  const openModal = () => {
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    modal.querySelector('.modal__close').focus();
  };
  
  const closeModal = () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    staffButton.focus();
  };

  staffButton.addEventListener('click', openModal);
  modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeModal));
  
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && modal.classList.contains('is-open')) {
      closeModal();
    }
  });
});