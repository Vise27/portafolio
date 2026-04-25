// Scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (window.scrollY / totalHeight) * 100;
    scrollProgress.style.width = `${progress}%`;
});

// Scroll section active link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                const activeLink = document.querySelector('header nav a[href*=' + id + ']');
                if (activeLink) activeLink.classList.add('active');
            });
        };
    });

    // Sticky navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Typed JS
const typed = new Typed('.multiple-text', {
    strings: ['Software', 'Aplicaciones Móviles', 'Soluciones Digitales', 'Arquitecturas Modernas'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
});

// Intersection Observer for Reveal Effect
const revealElements = document.querySelectorAll('.exp-card, .project-box, .edu-card, .skill-category, .about-content, .contact-item');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    revealObserver.observe(el);
});

// CSS for revealed state (added via JS injection or manually in CSS)
const style = document.createElement('style');
style.textContent = `
    .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(to right, var(--main-color), var(--accent-color));
        z-index: 1001;
        transition: width 0.1s;
    }
`;
document.head.appendChild(style);

// Modal Functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.getElementById('modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.remove('active');
        document.getElementById('modal-overlay').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

const modalOverlay = document.getElementById('modal-overlay');
if (modalOverlay) {
    modalOverlay.addEventListener('click', () => {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
}
