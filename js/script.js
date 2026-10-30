(() => {
  const typingElement = document.querySelector('.typing-text');
  const fullTypingText = typingElement?.dataset.text || '';
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (typingElement) {
    if (prefersReducedMotion) {
      typingElement.textContent = fullTypingText;
    } else {
      let character = 0;
      const typeNextCharacter = () => {
        if (character < fullTypingText.length) {
          typingElement.textContent += fullTypingText.charAt(character);
          character += 1;
          window.setTimeout(typeNextCharacter, 105);
        }
      };
      window.setTimeout(typeNextCharacter, 450);
    }
  }

  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#site-nav');

  if (menuButton && nav) {
    const closeMenu = () => {
      nav.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Abrir menu');
    };

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
      nav.classList.toggle('is-open', !isOpen);
    });

    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') closeMenu();
    });
    document.addEventListener('click', event => {
      if (!nav.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
    });
  }

  const revealTargets = document.querySelectorAll(
    '.about .wrap > *, .srv, .proj, .step, .contact .wrap > *, .steps.timeline'
  );
  revealTargets.forEach((element, index) => {
    element.classList.add('reveal');
    if (index % 4) element.classList.add('reveal-delay-' + (index % 4));
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, currentObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

    revealTargets.forEach(element => observer.observe(element));
  } else {
    revealTargets.forEach(element => element.classList.add('is-visible'));
  }
})();
