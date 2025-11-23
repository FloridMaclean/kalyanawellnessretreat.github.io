// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        mobileMenuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            mobileMenuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// Newsletter Form
const newsletterForm = document.getElementById('newsletter-form');
const toast = document.getElementById('toast');
const toastMessage = document.getElementById('toast-message');

function showToast(message, isError = false) {
    if (toast && toastMessage) {
        toastMessage.textContent = message;
        
        // Add or remove error class
        if (isError) {
            toast.classList.add('error');
        } else {
            toast.classList.remove('error');
        }
        
        toast.classList.add('show');
        
        // Hide toast after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }
}

function validateEmail(email) {
    // RFC 5322 compliant email regex pattern
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email);
}

if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('.newsletter-input');
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = emailInput ? emailInput.value.trim() : '';
        
        // Validate email
        if (!email) {
            // Show toast notification for empty email
            showToast('Please enter your email address to subscribe.', true);
            return;
        }
        
        if (!validateEmail(email)) {
            // Show toast notification for invalid email
            showToast('Please enter a valid email address to subscribe.', true);
            return;
        }
        
        // Show thank you message
        showToast('Thank you for subscribing! We\'ll send updates to your email.');
        newsletterForm.reset();
    });
}

// Discovery Call Modal
const discoveryModal = document.getElementById('discovery-modal');
const discoveryForm = document.getElementById('discovery-form');
const modalClose = document.querySelector('.modal-close');

// Open modal (can be triggered by various events)
function openModal() {
    if (discoveryModal) {
        discoveryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Close modal
function closeModal() {
    if (discoveryModal) {
        discoveryModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close modal button
if (modalClose) {
    modalClose.addEventListener('click', closeModal);
}

// Close modal when clicking outside
if (discoveryModal) {
    discoveryModal.addEventListener('click', (e) => {
        if (e.target === discoveryModal) {
            closeModal();
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && discoveryModal && discoveryModal.classList.contains('active')) {
        closeModal();
    }
});

// Discovery form submission
if (discoveryForm) {
    discoveryForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(discoveryForm);
        const email = formData.get('email');
        
        // Simulate form submission
        alert(`Thank you! We'll contact you at ${email} to schedule your discovery call.`);
        discoveryForm.reset();
        closeModal();
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href.length > 1) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add scroll effect to header
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (header) {
        if (currentScroll > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            header.style.background = 'rgba(255, 255, 255, 0.95)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
            header.style.background = 'var(--bg-white)';
        }
    }
    
    lastScroll = currentScroll;
}, { passive: true });

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards and sections for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.retreat-card');
    const sections = document.querySelectorAll('section');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1), transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        observer.observe(card);
    });
    
    sections.forEach(section => {
        const title = section.querySelector('.section-title');
        if (title) {
            title.style.opacity = '0';
            title.style.transform = 'translateY(20px)';
            title.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(title);
        }
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
}, { passive: true });


// FAQ Accordion Functionality
document.addEventListener('DOMContentLoaded', () => {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isExpanded = question.getAttribute('aria-expanded') === 'true';
            const answerId = question.getAttribute('aria-controls');
            const answer = document.getElementById(answerId);
            
            // Close all other FAQs (accordion behavior)
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== question) {
                    const otherAnswerId = otherQuestion.getAttribute('aria-controls');
                    const otherAnswer = document.getElementById(otherAnswerId);
                    if (otherAnswer) {
                        otherQuestion.setAttribute('aria-expanded', 'false');
                        otherAnswer.setAttribute('aria-hidden', 'true');
                    }
                }
            });
            
            // Toggle current FAQ
            if (answer) {
                if (isExpanded) {
                    question.setAttribute('aria-expanded', 'false');
                    answer.setAttribute('aria-hidden', 'true');
                } else {
                    question.setAttribute('aria-expanded', 'true');
                    answer.setAttribute('aria-hidden', 'false');
                }
            }
        });
    });

    // Retreat Detail Page - Handle dynamic content based on URL parameter
    if (window.location.pathname.includes('retreat-detail.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const retreatParam = urlParams.get('retreat') || 'mount-abu'; // Default to Mount Abu
        
        const retreatsData = {
            'mount-abu': {
                name: 'Mount Abu',
                type: 'Spiritual Retreat',
                date: '2026-04',
                dateText: 'APR - MAY, MULTIPLE DATES 2026',
                subtitle: 'Where the mountains become your temple, and silence becomes your guide.',
                description: `
                    <p class="retreat-description" style="font-size: 1.1em; font-style: italic; margin-bottom: 2em;">Mount Abu is not just a destination — it is a living sacred space.</p>
                    <p class="retreat-description">For centuries, sages, yogis, monks, mystics, and seekers have walked these mountains in search of truth, clarity, and inner liberation.</p>
                    <p class="retreat-description">The land holds their energy. The silence holds their wisdom. The air carries their prayers.</p>
                    <p class="retreat-description">At Kalyāna, we honour this ancient spiritual vibration and create retreats that let you experience Mount Abu the way the saints once did — through stillness, presence, and soulful connection.</p>
                    <p class="retreat-description" style="margin-top: 2em; margin-bottom: 2em;">Here, the mountain itself becomes the master. Nature becomes the scripture. And your own breath becomes the mantra.</p>
                    
                    <h3 class="section-subtitle" style="margin-top: 3em; margin-bottom: 1.5em; font-size: 1.5em; font-weight: 600;">✨ The Spiritual Essence of Mount Abu at Kalyāna</h3>
                    
                    <div style="margin-bottom: 2.5em;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">1. A Mountain with Ancient Memory</h4>
                        <p class="retreat-description">Mount Abu is part of the oldest mountain range on Earth — older even than the Himalayas. These ancient rocks hold millions of years of silence, wisdom, and spiritual vibration.</p>
                        <p class="retreat-description">For centuries, monks, yogis, sages, and even the Buddha have meditated, wandered, and awakened on these slopes. Their presence has imprinted itself into the land.</p>
                        <p class="retreat-description">The mountains carry the energies of Shiva, Shakti, the Buddha, and timeless yogic traditions. The forests, the stones, and even the winds move with a gentle spiritual charge that naturally awakens inner awareness, steadies the mind, and purifies the heart.</p>
                        <p class="retreat-description">At Kalyāna, we help you tune into this sacred frequency through guided silence, mindful walking, breath-led practices, and meditative rituals that let you feel the subtle spirit of the mountain.</p>
                    </div>
                    
                    <div style="margin-bottom: 2.5em;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">2. Silence as a Sacred Teacher</h4>
                        <p class="retreat-description">Silence is the heart of Kalyāna. Not just the outer quiet, but the inner stillness that arises when you listen deeply.</p>
                        <p class="retreat-description">Mount Abu's peaceful atmosphere creates the perfect space for meditation, introspection, and emotional release.</p>
                        <p class="retreat-description">Here, silence is not empty — it is alive. Alive with clarity, healing, and presence.</p>
                    </div>
                    
                    <div style="margin-bottom: 2.5em;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">3. Nature as a Spiritual Path</h4>
                        <p class="retreat-description">Every natural element around Kalyāna becomes a spiritual companion:</p>
                        <ul class="inclusions-list" style="margin-top: 1em;">
                            <li>The mountains teach grounding and stability</li>
                            <li>The wind whispers intuition</li>
                            <li>The forests awaken innocence</li>
                            <li>The sunrise opens the heart</li>
                            <li>The night sky reminds you of your vastness</li>
                        </ul>
                        <p class="retreat-description" style="margin-top: 1em;">You don't "practice" spirituality here — you experience it through nature.</p>
                    </div>
                    
                    <div style="margin-bottom: 2.5em;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">4. Awakening Inner Light</h4>
                        <p class="retreat-description">Our retreats include spiritual practices like:</p>
                        <ul class="inclusions-list" style="margin-top: 1em;">
                            <li>Sunrise meditation and pranayama</li>
                            <li>Mantra chanting and Nature-based sound healing</li>
                            <li>Yogic meditation</li>
                            <li>Conscious breathwork</li>
                            <li>Emotional purification rituals</li>
                            <li>Nature contemplation and walking meditations</li>
                        </ul>
                        <p class="retreat-description" style="margin-top: 1em;">Each practice is offered with reverence, helping you soften, open, and reconnect with your soul.</p>
                    </div>
                    
                    <div style="margin-bottom: 2.5em;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">5. Returning to the Self</h4>
                        <p class="retreat-description">Kalyāna means auspiciousness, purity, and inner wellbeing.</p>
                        <p class="retreat-description">Our Mount Abu retreats guide you towards your own inner Kalyāna — the peace that was always within you, the clarity hidden beneath noise, the wisdom waiting in your heart.</p>
                        <p class="retreat-description" style="font-style: italic; margin-top: 1em;">This is not a retreat you attend. It is a homecoming.</p>
                    </div>
                    
                    <div style="margin-top: 3em; padding: 2em; background: rgba(74, 112, 169, 0.05); border-radius: 8px;">
                        <h4 style="font-size: 1.2em; font-weight: 600; margin-bottom: 1em;">🌄 Why Mount Abu Is Spiritually Transformative</h4>
                        <ul class="inclusions-list">
                            <li>It is a land of ancient sages</li>
                            <li>The vibration of silence is extraordinarily pure</li>
                            <li>The mountains naturally quiet the mind</li>
                            <li>The forest energy heals emotional turbulence</li>
                            <li>The air feels light, clean, and alive</li>
                            <li>The land holds a sacred presence felt instantly by sensitive seekers</li>
                        </ul>
                        <p class="retreat-description" style="margin-top: 1.5em; font-weight: 500;">Mount Abu doesn't just relax you — it uplifts you. It awakens something ancient within.</p>
                    </div>
                `,
                price: '₹49,000',
                duration: '7 days / 6 nights',
                groupSize: '12-20 participants',
                difficulty: 'All Levels',
                metaTitle: 'Mount Abu Spiritual Retreat - Kalyāna Wellness Retreat',
                metaDescription: 'Mount Abu Spiritual Retreat - Where the mountains become your temple, and silence becomes your guide.',
                relatedRetreat: 'bera-jawai'
            },
            'bera-jawai': {
                name: 'Bera Jawai',
                type: 'Wildlife Retreat',
                date: '2026-03',
                dateText: 'Mar, 2026',
                subtitle: 'Immerse yourself in the natural beauty and wildlife of Bera Jawai in this transformative retreat',
                description: `
                    <p class="retreat-description">Discover the untamed wilderness of Bera Jawai, a hidden gem in Rajasthan known for its rich biodiversity and leopard population. This retreat combines wildlife experiences with wellness practices, nature immersion, and authentic cultural connections.</p>
                    <p class="retreat-description">Bera Jawai offers a unique opportunity to connect with nature in its purest form. Our carefully curated retreat allows you to experience wildlife safaris, scenic landscapes, and traditional hospitality while engaging in transformative wellness practices.</p>
                `,
                price: '$2,299',
                duration: '6 days / 5 nights',
                groupSize: '10-18 participants',
                difficulty: 'All Levels',
                metaTitle: 'Bera Jawai Wildlife Retreat - Kalyāna Wellness Retreat',
                metaDescription: 'Bera Jawai Wildlife Retreat - Experience nature, wellness, and wildlife in this transformative retreat experience.',
                relatedRetreat: 'mount-abu'
            }
        };

        const retreat = retreatsData[retreatParam];
        const relatedRetreat = retreatsData[retreat.relatedRetreat];

        if (retreat) {
            // Update page title
            const pageTitle = document.getElementById('page-title');
            if (pageTitle) pageTitle.textContent = retreat.metaTitle;
            
            // Update meta description
            const metaDescription = document.querySelector('meta[name="description"]');
            if (metaDescription) metaDescription.setAttribute('content', retreat.metaDescription);

            // Update hero section
            const retreatDate = document.getElementById('retreat-date');
            if (retreatDate) {
                retreatDate.textContent = retreat.dateText;
                retreatDate.setAttribute('datetime', retreat.date);
            }

            const retreatTitle = document.getElementById('retreat-title');
            if (retreatTitle) retreatTitle.textContent = `${retreat.name} | ${retreat.type}`;

            const retreatSubtitle = document.getElementById('retreat-subtitle');
            if (retreatSubtitle) retreatSubtitle.textContent = retreat.subtitle;

            // Update description
            const retreatDescription = document.getElementById('retreat-description');
            if (retreatDescription) retreatDescription.innerHTML = retreat.description;

            // Update booking card
            const bookingPrice = document.getElementById('booking-price');
            if (bookingPrice) bookingPrice.textContent = retreat.price;

            const bookingDuration = document.getElementById('booking-duration');
            if (bookingDuration) bookingDuration.textContent = retreat.duration;

            const bookingGroupSize = document.getElementById('booking-group-size');
            if (bookingGroupSize) bookingGroupSize.textContent = retreat.groupSize;

            const bookingDifficulty = document.getElementById('booking-difficulty');
            if (bookingDifficulty) bookingDifficulty.textContent = retreat.difficulty;

            // Update related retreats section
            const relatedRetreatsGrid = document.getElementById('related-retreats');
            if (relatedRetreatsGrid && relatedRetreat) {
                const relatedRetreatUrl = `retreat-detail.html?retreat=${retreat.relatedRetreat}`;
                relatedRetreatsGrid.innerHTML = `
                    <article class="retreat-card" data-retreat-url="${relatedRetreatUrl}" role="listitem" tabindex="0">
                        <div class="retreat-image">
                            <div class="retreat-placeholder" role="img" aria-label="${relatedRetreat.name} ${relatedRetreat.type.toLowerCase()} destination"></div>
                        </div>
                        <div class="retreat-content">
                            <time class="retreat-date" datetime="${relatedRetreat.date}">${relatedRetreat.dateText}</time>
                            <h3 class="retreat-title">${relatedRetreat.name} | ${relatedRetreat.type}</h3>
                            <a href="${relatedRetreatUrl}" class="retreat-link" aria-label="Learn more about ${relatedRetreat.name} ${relatedRetreat.type}">Learn More</a>
                        </div>
                    </article>
                `;
                // Make the dynamically created card clickable
                const newCard = relatedRetreatsGrid.querySelector('.retreat-card');
                if (newCard) {
                    newCard.addEventListener('click', (e) => {
                        if (!e.target.closest('.retreat-link')) {
                            window.location.href = relatedRetreatUrl;
                        }
                    });
                    newCard.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            window.location.href = relatedRetreatUrl;
                        }
                    });
                }
            }
        }
    }

    // Make retreat cards fully clickable
    const retreatCards = document.querySelectorAll('.retreat-card');
    retreatCards.forEach(card => {
        const retreatUrl = card.getAttribute('data-retreat-url');
        if (retreatUrl) {
            // Handle card click
            card.addEventListener('click', (e) => {
                // Don't navigate if clicking on the "Learn More" link itself
                if (!e.target.closest('.retreat-link')) {
                    window.location.href = retreatUrl;
                }
            });

            // Handle keyboard navigation (Enter key)
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    window.location.href = retreatUrl;
                }
            });
        }
    });

    // Carousel functionality for retreat detail page
    const carousel = document.querySelector('.retreat-carousel');
    if (carousel) {
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        const prevBtn = carousel.querySelector('.carousel-prev');
        const nextBtn = carousel.querySelector('.carousel-next');
        let currentSlide = 0;

        // Function to load image for a slide
        function loadSlideImage(slideIndex) {
            if (!slides[slideIndex]) return;
            const slide = slides[slideIndex];
            const picture = slide.querySelector('picture');
            if (!picture) return;
            
            const source = picture.querySelector('source');
            const img = picture.querySelector('img');
            
            // Load webp source if it has data-srcset
            if (source && source.hasAttribute('data-srcset')) {
                source.srcset = source.getAttribute('data-srcset');
                source.removeAttribute('data-srcset');
            }
            
            // Load img if it has data-src
            if (img && img.hasAttribute('data-src')) {
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
            }
        }
        
        // Initialize: only load first slide (more aggressive optimization)
        if (slides.length > 0) {
            loadSlideImage(0);
        }

        function showSlide(index) {
            // Remove active class from all slides and indicators
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (indicators[i]) {
                    indicators[i].classList.remove('active');
                    indicators[i].setAttribute('aria-selected', 'false');
                }
            });

            // Add active class to current slide and indicator
            if (slides[index]) {
                slides[index].classList.add('active');
                if (indicators[index]) {
                    indicators[index].classList.add('active');
                    indicators[index].setAttribute('aria-selected', 'true');
                }
            }
            
            // Load current slide image
            loadSlideImage(index);
            
            // Preload only next image (more conservative)
            const nextIndex = (index + 1) % slides.length;
            if (nextIndex !== index) {
                loadSlideImage(nextIndex);
            }
            
            currentSlide = index;
        }

        function nextSlide() {
            const next = (currentSlide + 1) % slides.length;
            showSlide(next);
        }

        function prevSlide() {
            const prev = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(prev);
        }

        // Event listeners for navigation buttons
        if (nextBtn) {
            nextBtn.addEventListener('click', nextSlide);
        }
        if (prevBtn) {
            prevBtn.addEventListener('click', prevSlide);
        }

        // Event listeners for indicators
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => showSlide(index));
        });

        // Keyboard navigation
        carousel.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
    }

    // Mobile Testimonials Carousel - Show one review at a time, change every 5 seconds
    const testimonialsCarousel = document.getElementById('testimonials-carousel');
    const testimonialPrevBtn = document.getElementById('testimonial-prev');
    const testimonialNextBtn = document.getElementById('testimonial-next');
    let mobileCarouselInterval = null;
    let currentMobileIndex = 0;
    let isAnimating = false;
    let uniqueTestimonialCards = [];

    function changeTestimonial(direction = 'next') {
        if (!testimonialsCarousel || isAnimating) return;

        const testimonialCards = uniqueTestimonialCards.length > 0 ? uniqueTestimonialCards : Array.from(testimonialsCarousel.querySelectorAll('.testimonial-card'));
        if (testimonialCards.length === 0) return;

        const currentCard = testimonialCards[currentMobileIndex];
        if (!currentCard) return;

        isAnimating = true;

        // Determine next index
        let nextIndex;
        if (direction === 'next') {
            nextIndex = (currentMobileIndex + 1) % testimonialCards.length;
        } else {
            nextIndex = (currentMobileIndex - 1 + testimonialCards.length) % testimonialCards.length;
        }

        const nextCard = testimonialCards[nextIndex];
        if (!nextCard) {
            isAnimating = false;
            return;
        }

        // Remove all animation classes from all cards
        const allCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
        allCards.forEach(card => {
            card.classList.remove('active', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
        });

        // Add slide-out animation to current card
        if (direction === 'next') {
            currentCard.classList.add('slide-out-left');
        } else {
            currentCard.classList.add('slide-out-right');
        }

        // Add slide-in animation to next card
        if (direction === 'next') {
            nextCard.classList.add('slide-in-right');
        } else {
            nextCard.classList.add('slide-in-left');
        }

        // Update index
        currentMobileIndex = nextIndex;

        // After animation completes, set active class and remove animation classes
        setTimeout(() => {
            allCards.forEach(card => {
                card.classList.remove('slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            });
            nextCard.classList.add('active');
            isAnimating = false;
        }, 600); // Match animation duration
    }

    function initMobileTestimonials() {
        if (!testimonialsCarousel) return;

        const allCards = testimonialsCarousel.querySelectorAll('.testimonial-card');
        if (allCards.length === 0) return;

        // Get unique cards only (exclude duplicates added for seamless desktop loop)
        // Count unique cards by checking if we've seen this content before
        uniqueTestimonialCards = [];
        const seenContent = new Set();
        
        allCards.forEach(card => {
            const text = card.querySelector('.testimonial-text')?.textContent;
            if (text && !seenContent.has(text)) {
                seenContent.add(text);
                uniqueTestimonialCards.push(card);
            }
        });

        // If no unique cards found, use all cards
        const testimonialCards = uniqueTestimonialCards.length > 0 ? uniqueTestimonialCards : Array.from(allCards);

        const isMobile = window.innerWidth <= 640;

        if (isMobile) {
            // Hide all cards first (using visibility, not display)
            allCards.forEach(card => {
                card.classList.remove('active', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            });
            
            // Show the first unique card
            if (testimonialCards[0]) {
                testimonialCards[0].classList.add('active');
                // Set container height based on first card to prevent vertical movement
                setTimeout(() => {
                    if (testimonialCards[0] && testimonialsCarousel) {
                        const cardHeight = testimonialCards[0].offsetHeight;
                        if (cardHeight > 0) {
                            testimonialsCarousel.style.minHeight = cardHeight + 'px';
                        }
                    }
                }, 100);
            }

            currentMobileIndex = 0;
            isAnimating = false;

            // Clear any existing interval
            if (mobileCarouselInterval) {
                clearInterval(mobileCarouselInterval);
            }

            // Set up interval to change reviews every 5 seconds
            mobileCarouselInterval = setInterval(() => {
                if (!isAnimating) {
                    changeTestimonial('next');
                }
            }, 5000); // 5 seconds

            // Add button event listeners
            if (testimonialNextBtn) {
                testimonialNextBtn.onclick = () => {
                    if (mobileCarouselInterval) {
                        clearInterval(mobileCarouselInterval);
                    }
                    changeTestimonial('next');
                    // Restart auto-advance
                    mobileCarouselInterval = setInterval(() => {
                        if (!isAnimating) {
                            changeTestimonial('next');
                        }
                    }, 5000);
                };
            }

            if (testimonialPrevBtn) {
                testimonialPrevBtn.onclick = () => {
                    if (mobileCarouselInterval) {
                        clearInterval(mobileCarouselInterval);
                    }
                    changeTestimonial('prev');
                    // Restart auto-advance
                    mobileCarouselInterval = setInterval(() => {
                        if (!isAnimating) {
                            changeTestimonial('next');
                        }
                    }, 5000);
                };
            }
        } else {
            // Desktop: remove active classes and clear interval, restore all cards
            allCards.forEach(card => {
                card.classList.remove('active', 'slide-in-left', 'slide-in-right', 'slide-out-left', 'slide-out-right');
            });
            if (mobileCarouselInterval) {
                clearInterval(mobileCarouselInterval);
                mobileCarouselInterval = null;
            }
            currentMobileIndex = 0;
            isAnimating = false;

            // Remove button event listeners
            if (testimonialNextBtn) {
                testimonialNextBtn.onclick = null;
            }
            if (testimonialPrevBtn) {
                testimonialPrevBtn.onclick = null;
            }
        }
    }

    // Initialize on page load
    if (testimonialsCarousel) {
        initMobileTestimonials();
        
        // Re-initialize on window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initMobileTestimonials();
            }, 250);
        });
    }

    // Intersection Observer for lazy loading gallery images
    const galleryImages = document.querySelectorAll('.gallery-image[data-src], .gallery-image[loading="lazy"]');
    if (galleryImages.length > 0 && 'IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const picture = img.closest('picture');
                    
                    // Load webp source if it has data-srcset
                    if (picture) {
                        const source = picture.querySelector('source[data-srcset]');
                        if (source) {
                            source.srcset = source.getAttribute('data-srcset');
                            source.removeAttribute('data-srcset');
                        }
                    }
                    
                    // Load img if it has data-src
                    if (img.hasAttribute('data-src')) {
                        img.src = img.getAttribute('data-src');
                        img.removeAttribute('data-src');
                        img.loading = 'lazy';
                    }
                    
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px' // Start loading 50px before image enters viewport
        });

        galleryImages.forEach(img => {
            // Only observe images that aren't already loaded (first image)
            if (img.hasAttribute('data-src') || (img.loading === 'lazy' && !img.src.includes('data:'))) {
                imageObserver.observe(img);
            }
        });
    }

    // Use requestIdleCallback for non-critical image preloading
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            // Preload a few gallery images when browser is idle
            const galleryItems = document.querySelectorAll('.gallery-item:not(:first-child) picture source[data-srcset]');
            const preloadCount = Math.min(3, galleryItems.length);
            for (let i = 0; i < preloadCount; i++) {
                const source = galleryItems[i];
                if (source && source.hasAttribute('data-srcset')) {
                    const link = document.createElement('link');
                    link.rel = 'preload';
                    link.as = 'image';
                    link.href = source.getAttribute('data-srcset');
                    document.head.appendChild(link);
                }
            }
        }, { timeout: 2000 });
    }
});


