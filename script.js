// Scroll progress bar
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
});

// Mobile Hamburger Menu
const menuIcon = document.getElementById('menu-icon');
const navbar = document.getElementById('navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        navbar.classList.toggle('active');
        const icon = menuIcon.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('bx-menu');
            icon.classList.add('bx-x');
        } else {
            icon.classList.remove('bx-x');
            icon.classList.add('bx-menu');
        }
    });

    // Close mobile menu on clicking any navigation link
    navbar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navbar.classList.remove('active');
            const icon = menuIcon.querySelector('i');
            if (icon) {
                icon.classList.remove('bx-x');
                icon.classList.add('bx-menu');
            }
        });
    });
}

// Light / Dark Mode Toggle with System Preference Detection
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');

// Detect user's OS preference (Dark or Light)
const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Use saved preference if available, otherwise default to OS setting
const savedTheme = localStorage.getItem('portfolio-theme');
const initialTheme = savedTheme || getSystemTheme();

document.documentElement.setAttribute('data-theme', initialTheme);
updateThemeIcon(initialTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Listen for system theme changes in real-time (if the user hasn't set a manual override)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('portfolio-theme')) {
        const systemTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', systemTheme);
        updateThemeIcon(systemTheme);
    }
});

function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'light') {
        themeIcon.classList.remove('bx-sun');
        themeIcon.classList.add('bx-moon');
    } else {
        themeIcon.classList.remove('bx-moon');
        themeIcon.classList.add('bx-sun');
    }
}

// About Section Carousel (Infinite Loop)
const carouselTrack = document.querySelector('.carousel-track');
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtn = document.getElementById('carousel-prev');
const nextBtn = document.getElementById('carousel-next');
const dotsContainer = document.getElementById('carousel-dots');

if (carouselSlides.length > 0 && dotsContainer) {
    let currentIndex = 0;
    let carouselInterval;

    // Create indicators/dots
    carouselSlides.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.classList.add('carousel-dot');
        if (idx === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(idx);
            resetAutoplay();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-dot');

    function updateCarousel() {
        carouselSlides.forEach((slide, idx) => {
            slide.classList.remove('active', 'slide-out-left');
            if (idx === currentIndex) {
                slide.classList.add('active');
            }
        });

        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentIndex);
        });
    }

    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselSlides.length;
        updateCarousel();
    }

    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselSlides.length) % carouselSlides.length;
        updateCarousel();
    }

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function startAutoplay() {
        carouselInterval = setInterval(nextSlide, 4500); // changes every 4.5 seconds
    }

    function resetAutoplay() {
        clearInterval(carouselInterval);
        startAutoplay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoplay();
        });
    }

    // Pause autoplay on hover so the user can comfortably read
    const carouselWrapper = document.querySelector('.about-carousel-wrapper');
    if (carouselWrapper) {
        carouselWrapper.addEventListener('mouseenter', () => clearInterval(carouselInterval));
        carouselWrapper.addEventListener('mouseleave', startAutoplay);
    }

    startAutoplay();
}

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
    strings: ['Full Stack', 'Web & Móvil', 'en Odoo ERP', 'Backend Python / Django'],
    typeSpeed: 60,
    backSpeed: 40,
    backDelay: 2200,
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

// Modal Functions with Accessibility
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.getElementById('modal-overlay').classList.add('active');
        document.body.style.overflow = 'hidden';
        const closeBtn = modal.querySelector('.close-modal');
        if (closeBtn) closeBtn.focus();
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

// Close on ESC key for accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal.active').forEach(modal => {
            modal.classList.remove('active');
        });
        const modalOverlay = document.getElementById('modal-overlay');
        if (modalOverlay) modalOverlay.classList.remove('active');
        if (imageLightbox && imageLightbox.classList.contains('active')) {
            closeImageLightbox();
        }
        document.body.style.overflow = 'auto';
    }
});

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

// Image Lightbox Functions
const imageLightbox = document.getElementById('image-lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openImageLightbox(src) {
    if(imageLightbox && lightboxImg) {
        lightboxImg.src = src;
        imageLightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeImageLightbox() {
    if(imageLightbox) {
        imageLightbox.classList.remove('active');
        lightboxImg.src = '';
        if(!document.querySelector('.modal.active')) {
            document.body.style.overflow = 'auto';
        }
    }
}

if (imageLightbox) {
    imageLightbox.addEventListener('click', (e) => {
        if (e.target === imageLightbox) {
            closeImageLightbox();
        }
    });
}

// Add click event to images
document.addEventListener('DOMContentLoaded', () => {
    const clickableImages = document.querySelectorAll('.modal-gallery img, .project-image img');
    clickableImages.forEach(img => {
        img.addEventListener('click', () => {
            openImageLightbox(img.src);
        });
    });
});
