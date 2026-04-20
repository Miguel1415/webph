import { supabase } from './supabase.js';

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

    // 4. Gallery Logic (Supabase)
    const galleryGrid = document.getElementById('gallery-grid');
    const featuredGrid = document.getElementById('featured-grid');
    const heroCarousel = document.getElementById('hero-carousel');
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

    const setupGalleryFilters = () => {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const filterBtnsSub = document.querySelectorAll('.filter-btn-sub');
        const galleryItems = document.querySelectorAll('.gallery-item');
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

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
                if (dropdown.classList.contains('active')) {
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
                if (btn.classList.contains('dropdown-toggle')) return;

                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.dataset.filter;
                updateDescription(filter);

                galleryItems.forEach(item => {
                    item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';

                    const itemCategory = (item.dataset.category || '').toLowerCase();
                    const filterLower = filter.toLowerCase();

                    if (filterLower === 'all' || itemCategory === filterLower) {
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
    };

    const renderGallery = (items, targetGrid, isFullGallery = false) => {
        if (!targetGrid) return;

        if (items.length === 0) {
            targetGrid.innerHTML = '<div class="empty-state">No hay imágenes disponibles.</div>';
            return;
        }

        // Sort items by display_order if available, otherwise by date
        const sortedItems = [...items].sort((a, b) => (a.display_order || 0) - (b.display_order || 0));

        targetGrid.innerHTML = sortedItems.map(item => {
            const fileName = item.image_url.split('/').pop();
            const localFallback = `assets/images/Galeria/${item.category}/${fileName}`;
            
            return `
                <div class="gallery-item section-fade" ${isFullGallery ? `data-category="${item.category}" ${item.subcategory ? `data-subcategory="${item.subcategory}"` : ''}` : ''}>
                    <div class="item-inner">
                        <img src="${item.image_url}" 
                            alt="${item.description || ''}" 
                            loading="lazy" 
                            class="view-large" 
                            data-description="${item.description || ''}"
                            onerror="this.src='${localFallback}'; this.onerror=()=>this.closest('.gallery-item').style.display='none'; console.warn('Fallback local para galería:', '${fileName}')">
                    </div>
                    <div class="item-content">
                        <p class="collection-desc">${item.description || ''}</p>
                    </div>
                </div>
            `;
        }).join('');

        // Re-observe new items for animations
        document.querySelectorAll('.gallery-item').forEach(el => {
            observer.observe(el);
        });

        // Setup Lightbox for new items
        attachLightboxEvents();

        if (isFullGallery) {
            // Initialize filters only for the main gallery page
            setupGalleryFilters();

            // Trigger initial filter (e.g., landscapes)
            const initialFilter = document.querySelector('.filter-btn.active');
            if (initialFilter) initialFilter.dispatchEvent(new Event('click'));
        }
    };

    // 9. Lightbox Functionality
    const openLightbox = (url, description) => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        
        if (!lightbox) return;
        
        lightboxImg.src = url;
        lightboxCaption.textContent = description || '';
        lightbox.style.display = 'block';
        setTimeout(() => {
            lightbox.classList.add('active');
        }, 10);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (!lightbox) return;
        
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightbox.style.display = 'none';
            lightboxImg.src = '';
        }, 300);
        document.body.style.overflow = '';
    };

    const setupLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        const closeBtn = document.querySelector('.lightbox-close');

        if (!lightbox || !closeBtn) return;

        closeBtn.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target.id === 'lightbox-img') {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    };

    const attachLightboxEvents = () => {
        document.querySelectorAll('.view-large').forEach(trigger => {
            // Remove old listener if any to avoid duplicates
            trigger.removeEventListener('click', handleLightboxClick);
            trigger.addEventListener('click', handleLightboxClick);
        });
    };

    const handleLightboxClick = (e) => {
        e.preventDefault();
        const trigger = e.currentTarget;
        const url = trigger.src || trigger.dataset.url;
        const description = trigger.dataset.description || trigger.alt || '';
        openLightbox(url, description);
    };

    let heroCarouselInterval; // Variable global al scope de main.js para control de limpieza

    const renderHero = (items) => {
        if (!heroCarousel) return;

        if (items.length === 0) {
            heroCarousel.innerHTML = '<div class="carousel-slide active" style="background: var(--bg-surface)"></div>';
            return;
        }

        heroCarousel.innerHTML = items.map((item, index) => {
            // Extraer el nombre del archivo de la URL de Supabase para el fallback local
            const fileName = item.image_url.split('/').pop();
            const localFallback = `assets/images/carrousel/${fileName}`;
            
            return `
                <div class="carousel-slide ${index === 0 ? 'active' : ''}"
                    style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${item.image_url}'), url('${localFallback}'); background-color: #1a1a1a;">
                    <img src="${item.image_url}" style="display:none" 
                        onerror="this.parentElement.style.backgroundImage = 'linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(\'${localFallback}\')'; console.warn('Usando fallback local para Hero [${index}]: ${fileName}')">
                </div>
            `;
        }).join('');

        // Wait for next tick to ensure DOM is ready and images have a chance to start loading
        setTimeout(() => initHeroCarousel(), 200);
    };

    const fetchGalleryItems = async () => {
        if (!galleryGrid && !featuredGrid && !heroCarousel) return;

        try {
            // Fetch Hero items
            if (heroCarousel) {
                const { data: heroData, error: heroError } = await supabase
                    .from('gallery_items')
                    .select('*')
                    .eq('is_hero', true)
                    .order('display_order', { ascending: true });
                
                if (heroError) throw heroError;
                if (heroData) renderHero(heroData);
            }
// ... (resto de fetchGalleryItems)

            // Fetch Gallery items
            const { data, error } = await supabase
                .from('gallery_items')
                .select('*')
                .order('display_order', { ascending: true });

            if (error) throw error;

            if (galleryGrid) {
                renderGallery(data, galleryGrid, true);
            }
            
            if (featuredGrid) {
                // Show only first 6 on home page
                renderGallery(data.slice(0, 6), featuredGrid, false);
            }
        } catch (error) {
            console.error('Error fetching gallery:', error.message);
            if (galleryGrid) galleryGrid.innerHTML = '<div class="error-state">Error al cargar la galería.</div>';
            if (featuredGrid) featuredGrid.innerHTML = '<div class="error-state">Error al cargar la galería destacada.</div>';
        }
    };

    fetchGalleryItems();

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

    // 5. Smooth Anchor Links
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
        const dotsContainer = document.querySelector('.carousel-dots');
        if (!carousel || !dotsContainer) return;

        const slides = carousel.querySelectorAll('.carousel-slide');
        if (slides.length === 0) return;

        // Limpiar intervalo anterior antes de iniciar uno nuevo
        if (heroCarouselInterval) {
            clearInterval(heroCarouselInterval);
        }

        // Clean up previous dots to avoid duplicates on re-render
        dotsContainer.innerHTML = '';
        
        let currentSlide = 0;

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
            if (!slides[currentSlide] || !dots[currentSlide]) return;
            
            slides[currentSlide].classList.remove('active');
            dots[currentSlide].classList.remove('active');
            currentSlide = (n + slides.length) % slides.length;
            if (slides[currentSlide] && dots[currentSlide]) {
                slides[currentSlide].classList.add('active');
                dots[currentSlide].classList.add('active');
            }
        };

        const nextSlide = () => {
            goToSlide(currentSlide + 1);
        };

        const startInterval = () => {
            heroCarouselInterval = setInterval(nextSlide, 6000);
        };

        const resetInterval = () => {
            clearInterval(heroCarouselInterval);
            startInterval();
        };

        startInterval();
    };

    // Remove the static call at the end, it's now handled by fetchGalleryItems
    // initHeroCarousel();
    setupLightbox();

    // TSK-009: Se eliminó el bloque de código 'Custom Video Controls' que era necesario para los videos locales.
    // La nueva implementación con iframes de YouTube ya no requiere este script.
});

