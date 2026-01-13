document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Parallax Effect for Hero
    const hero = document.getElementById('hero');
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        if (hero) {
            hero.style.backgroundPositionY = (scrolled * 0.5) + 'px';
        }
    });

    // 3. Staggered Reveal Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for grid items or multiple items in same section
                if (entry.target.classList.contains('gallery-item')) {
                    entry.target.style.transitionDelay = (index % 3) * 0.1 + 's';
                }
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-fade, .gallery-item').forEach(el => {
        observer.observe(el);
    });

    // 4. Gallery Filtering with Dropdown Support
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterBtnsSub = document.querySelectorAll('.filter-btn-sub');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    const descriptions = document.querySelectorAll('.description');

    const updateDescription = (filter) => {
        descriptions.forEach(desc => {
            if (desc.dataset.description === filter) {
                desc.classList.add('active');
            } else {
                desc.classList.remove('active');
            }
        });
    };


    // Dropdown toggle functionality
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const dropdown = toggle.closest('.filter-dropdown');

            // Close other dropdowns first
            document.querySelectorAll('.filter-dropdown').forEach(d => {
                if (d !== dropdown) d.classList.remove('active');
            });

            // Toggle active state
            dropdown.classList.toggle('active');
            if(dropdown.classList.contains('active')) {
                updateDescription(toggle.dataset.filter);
            }
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', () => {
        document.querySelectorAll('.filter-dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });

    // Main filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.classList.contains('dropdown-toggle')) return; // Skip dropdown toggles

            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            updateDescription(filter);

            galleryItems.forEach(item => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    setTimeout(() => item.style.display = 'none', 600);
                }
            });
        });
    });

    // Subcategory filter buttons
    filterBtnsSub.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();

            // Remove active from all subcategory buttons
            filterBtnsSub.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;
            const subcategory = btn.dataset.subcategory;
            updateDescription(subcategory);

            galleryItems.forEach(item => {
                item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

                const matchesCategory = item.dataset.category === filter;
                const matchesSubcategory = subcategory === 'all' || item.dataset.subcategory === subcategory;

                if (matchesCategory && matchesSubcategory) {
                    item.style.display = '';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0) scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(30px) scale(0.95)';
                    setTimeout(() => item.style.display = 'none', 600);
                }
            });
        });
    });

    // 5. Smooth Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 90;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. Form Handling with Feedback
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Enviando Solicitud...</span>';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerHTML = '<span>¡Gracias! Nos contactaremos pronto.</span>';
                btn.style.backgroundColor = 'var(--accent)';
                contactForm.reset();
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 4000);
            }, 2000);
        });
    }

    // 7. Mobile Menu Toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // 8. Hero Carousel Implementation
    const initHeroCarousel = () => {
        const carousel = document.querySelector('.hero-carousel');
        if (!carousel) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        const dotsContainer = document.querySelector('.carousel-dots');
        let currentSlide = 0;
        let slideInterval;

        // Create dots
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const dots = dotsContainer.querySelectorAll('.dot');

        const goToSlide = (n) => {
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const startInterval = () => {
            slideInterval = setInterval(nextSlide, 6000);
        };

        const resetInterval = () => {
            clearInterval(slideInterval);
            startInterval();
        };

        startInterval();
    };

    initHeroCarousel();
});
