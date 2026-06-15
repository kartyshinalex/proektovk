document.addEventListener('DOMContentLoaded', () => {
    initHeaderState();
    initMobileMenu();
    initActiveNavigation();
    initObjectsToggle();
});

function initHeaderState() {
    const header = document.querySelector('[data-header]');
    if (!header) return;

    const update = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initMobileMenu() {
    const button = document.querySelector('[data-menu-button]');
    const nav = document.getElementById('mainNav');
    if (!button || !nav) return;

    const setOpen = (isOpen) => {
        nav.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('menu-open', isOpen);
        button.setAttribute('aria-expanded', String(isOpen));
        button.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
    };

    button.addEventListener('click', () => {
        setOpen(button.getAttribute('aria-expanded') !== 'true');
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setOpen(false));
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') setOpen(false);
    });
}

function initActiveNavigation() {
    const navLinks = Array.from(document.querySelectorAll('.nav-link'));
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute('href')))
        .filter(Boolean);

    if (!navLinks.length || !sections.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const id = `#${entry.target.id}`;
            navLinks.forEach((link) => {
                link.classList.toggle('is-active', link.getAttribute('href') === id);
            });
        });
    }, {
        rootMargin: '-45% 0px -45% 0px',
        threshold: 0,
    });

    sections.forEach((section) => observer.observe(section));
}

function initObjectsToggle() {
    const button = document.querySelector('[data-show-more]');
    const hiddenObjects = Array.from(document.querySelectorAll('[data-hidden-object]'));
    if (!button || !hiddenObjects.length) return;

    let expanded = false;
    button.addEventListener('click', () => {
        expanded = !expanded;
        hiddenObjects.forEach((item) => {
            item.hidden = !expanded;
        });
        button.textContent = expanded ? 'Скрыть дополнительные объекты' : 'Показать ещё объекты';
    });
}
