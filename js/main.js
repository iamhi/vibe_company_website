// Main JavaScript file for Company Showcase Website
// Comprehensive Navigation System Implementation

document.addEventListener('DOMContentLoaded', function() {
    console.log('Company Showcase Website loaded');
    
    // Navigation System
    initNavigation();
    
    // Initialize other features
    initSmoothScrolling();
    initActivePageHighlighting();
    initKeyboardNavigation();
    initMobileMenu();
    initSearchFunctionality();
    initAccessibilityFeatures();
    initServiceFilter();
    initContactForm();
    initFAQ();
    initMap();
});

/**
 * Initialize Navigation System
 */
function initNavigation() {
    // Set active page based on current URL
    setActiveNavigation();
    
    // Add navigation event listeners
    const navLinks = document.querySelectorAll('.nav-link, .nav-mobile-link');
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavigationClick);
    });
    
    // Handle dropdown menus
    initDropdownMenus();
    
    // Handle mobile menu toggle
    initMobileMenuToggle();
    
    // Handle search functionality
    initSearchToggle();
    
    // Handle language switcher
    initLanguageSwitcher();
}

/**
 * Set active navigation based on current page
 */
function setActiveNavigation() {
    const currentPath = window.location.pathname;
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Remove all active classes
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current page link
    document.querySelectorAll('.nav-link, .nav-mobile-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle navigation click events
 */
function handleNavigationClick(e) {
    const href = e.target.getAttribute('href');
    
    // Handle same-page anchor links
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            smoothScrollTo(target);
        }
        return;
    }
    
    // Handle external links
    if (href && href.startsWith('http')) {
        return; // Let default behavior handle external links
    }
    
    // Handle internal page navigation
    if (href && !href.startsWith('http')) {
        console.log('Navigating to:', href);
        // Close mobile menu if open
        closeMobileMenu();
    }
}

/**
 * Initialize Dropdown Menus
 */
function initDropdownMenus() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.nav-dropdown-toggle');
        const menu = dropdown.querySelector('.nav-dropdown-menu');
        
        if (toggle && menu) {
            // Handle hover for desktop
            dropdown.addEventListener('mouseenter', () => {
                if (window.innerWidth >= 1024) {
                    menu.style.opacity = '1';
                    menu.style.visibility = 'visible';
                    menu.style.transform = 'translateY(0)';
                }
            });
            
            dropdown.addEventListener('mouseleave', () => {
                if (window.innerWidth >= 1024) {
                    menu.style.opacity = '0';
                    menu.style.visibility = 'hidden';
                    menu.style.transform = 'translateY(-10px)';
                }
            });
            
            // Handle click for mobile
            toggle.addEventListener('click', (e) => {
                if (window.innerWidth < 1024) {
                    e.preventDefault();
                    const isVisible = menu.style.opacity === '1';
                    
                    // Close all other dropdowns
                    document.querySelectorAll('.nav-dropdown-menu').forEach(otherMenu => {
                        if (otherMenu !== menu) {
                            otherMenu.style.opacity = '0';
                            otherMenu.style.visibility = 'hidden';
                            otherMenu.style.transform = 'translateY(-10px)';
                        }
                    });
                    
                    // Toggle current dropdown
                    if (isVisible) {
                        menu.style.opacity = '0';
                        menu.style.visibility = 'hidden';
                        menu.style.transform = 'translateY(-10px)';
                    } else {
                        menu.style.opacity = '1';
                        menu.style.visibility = 'visible';
                        menu.style.transform = 'translateY(0)';
                    }
                }
            });
        }
    });
}

/**
 * Initialize Mobile Menu
 */
function initMobileMenu() {
    // Mobile menu is handled in initMobileMenuToggle()
}

/**
 * Initialize Mobile Menu Toggle
 */
function initMobileMenuToggle() {
    const navToggle = document.getElementById('nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navMobileClose = document.querySelector('.nav-mobile-close');
    
    if (navToggle && navMobile) {
        navToggle.addEventListener('click', toggleMobileMenu);
    }
    
    if (navMobileClose) {
        navMobileClose.addEventListener('click', closeMobileMenu);
    }
    
    if (navOverlay) {
        navOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Close mobile menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navMobile && navMobile.classList.contains('active')) {
            closeMobileMenu();
        }
    });
}

/**
 * Toggle Mobile Menu
 */
function toggleMobileMenu() {
    const navMobile = document.querySelector('.nav-mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMobile && navOverlay) {
        const isActive = navMobile.classList.contains('active');
        
        if (isActive) {
            closeMobileMenu();
        } else {
            openMobileMenu();
        }
    }
}

/**
 * Open Mobile Menu
 */
function openMobileMenu() {
    const navMobile = document.querySelector('.nav-mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMobile && navOverlay) {
        navMobile.classList.add('active');
        navOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger to X
        if (navToggle) {
            navToggle.classList.add('active');
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            }
        }
        
        // Focus first menu item
        const firstLink = navMobile.querySelector('.nav-mobile-link');
        if (firstLink) {
            setTimeout(() => firstLink.focus(), 300);
        }
    }
}

/**
 * Close Mobile Menu
 */
function closeMobileMenu() {
    const navMobile = document.querySelector('.nav-mobile');
    const navOverlay = document.querySelector('.nav-overlay');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMobile && navOverlay) {
        navMobile.classList.remove('active');
        navOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        // Animate X back to hamburger
        if (navToggle) {
            navToggle.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            if (spans.length >= 3) {
                spans[0].style.transform = '';
                spans[1].style.opacity = '';
                spans[2].style.transform = '';
            }
        }
        
        // Return focus to toggle button
        if (navToggle) {
            navToggle.focus();
        }
    }
}

/**
 * Initialize Search Functionality
 */
function initSearchFunctionality() {
    // Search is handled in initSearchToggle()
}

/**
 * Initialize Search Toggle
 */
function initSearchToggle() {
    const searchToggle = document.querySelector('.nav-search-toggle');
    const searchContainer = document.querySelector('.nav-search');
    const searchInput = document.querySelector('.nav-search-input');
    
    if (searchToggle && searchContainer) {
        searchToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isActive = searchContainer.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
            
            if (isActive) {
                searchContainer.classList.remove('active');
            } else {
                searchContainer.classList.add('active');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 100);
                }
            }
        });
        
        // Close search when clicking outside
        document.addEventListener('click', (e) => {
            if (!searchContainer.contains(e.target)) {
                searchContainer.classList.remove('active');
            }
        });
        
        // Handle search submission
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    const query = searchInput.value.trim();
                    if (query) {
                        console.log('Searching for:', query);
                        // Implement search functionality
                        searchContainer.classList.remove('active');
                        searchInput.value = '';
                    }
                }
            });
        }
    }
}

/**
 * Initialize Language Switcher
 */
function initLanguageSwitcher() {
    const languageToggle = document.querySelector('.nav-language-toggle');
    const languageMenu = document.querySelector('.nav-language-menu');
    
    if (languageToggle && languageMenu) {
        languageToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            const isVisible = languageMenu.style.opacity === '1';
            
            // Close all other dropdowns
            document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.transform = 'translateY(-10px)';
            });
            
            if (isVisible) {
                languageMenu.style.opacity = '0';
                languageMenu.style.visibility = 'hidden';
                languageMenu.style.transform = 'translateY(-10px)';
            } else {
                languageMenu.style.opacity = '1';
                languageMenu.style.visibility = 'visible';
                languageMenu.style.transform = 'translateY(0)';
            }
        });
        
        // Close language menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!languageToggle.contains(e.target) && !languageMenu.contains(e.target)) {
                languageMenu.style.opacity = '0';
                languageMenu.style.visibility = 'hidden';
                languageMenu.style.transform = 'translateY(-10px)';
            }
        });
        
        // Handle language selection
        const languageOptions = languageMenu.querySelectorAll('.nav-language-option');
        languageOptions.forEach(option => {
            option.addEventListener('click', (e) => {
                e.preventDefault();
                const selectedLang = option.getAttribute('data-lang');
                console.log('Language selected:', selectedLang);
                // Implement language switching
                languageMenu.style.opacity = '0';
                languageMenu.style.visibility = 'hidden';
                languageMenu.style.transform = 'translateY(-10px)';
            });
        });
    }
}

/**
 * Initialize Smooth Scrolling
 */
function initSmoothScrolling() {
    // Smooth scrolling is handled in handleNavigationClick()
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(element) {
    const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
    const targetPosition = element.offsetTop - headerHeight - 20;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Initialize Active Page Highlighting
 */
function initActivePageHighlighting() {
    // Active page highlighting is handled in setActiveNavigation()
}

/**
 * Initialize Keyboard Navigation
 */
function initKeyboardNavigation() {
    // Handle Tab navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            // Add focus styles for better keyboard navigation
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse interaction
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // Handle arrow key navigation in mobile menu
    const mobileLinks = document.querySelectorAll('.nav-mobile-link');
    mobileLinks.forEach((link, index) => {
        link.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowDown' && index < mobileLinks.length - 1) {
                e.preventDefault();
                mobileLinks[index + 1].focus();
            } else if (e.key === 'ArrowUp' && index > 0) {
                e.preventDefault();
                mobileLinks[index - 1].focus();
            }
        });
    });
}

/**
 * Initialize Accessibility Features
 */
function initAccessibilityFeatures() {
    // Add ARIA labels dynamically
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
        
        // Update ARIA expanded state
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = navToggle.classList.contains('active');
                    navToggle.setAttribute('aria-expanded', isActive.toString());
                }
            });
        });
        
        observer.observe(navToggle, { attributes: true });
    }
    
    // Add ARIA labels for dropdown toggles
    const dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(toggle => {
        toggle.setAttribute('aria-haspopup', 'true');
        toggle.setAttribute('aria-expanded', 'false');
    });
    
    // Add role for navigation landmarks
    const nav = document.querySelector('nav');
    if (nav) {
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Main navigation');
    }
    
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
        skipLink.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipLink.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView();
            }
        });
    }
}

/**
 * Handle window resize
 */
window.addEventListener('resize', () => {
    // Close mobile menu on resize to desktop
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
    
    // Close dropdowns on resize
    document.querySelectorAll('.nav-dropdown-menu').forEach(menu => {
        menu.style.opacity = '0';
        menu.style.visibility = 'hidden';
        menu.style.transform = 'translateY(-10px)';
    });
    
    document.querySelectorAll('.nav-search').forEach(search => {
        search.classList.remove('active');
    });
});

/**
 * Handle scroll events
 */
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const header = document.querySelector('.header');
    
    if (header) {
        // Hide/show header on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollTop = scrollTop;
});

/**
 * Initialize Service Filter
 */
function initServiceFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (filterButtons.length === 0 || serviceCards.length === 0) {
        return; // Exit if service filter elements don't exist
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter service cards
            serviceCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.style.display = 'block';
                    // Add animation
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // Update URL hash for bookmarking
            if (filter !== 'all') {
                window.history.replaceState(null, '', `#filter-${filter}`);
            } else {
                window.history.replaceState(null, '', window.location.pathname);
            }
        });
    });
    
    // Check for filter in URL hash on page load
    const hashFilter = window.location.hash.replace('#filter-', '');
    if (hashFilter) {
        const targetButton = document.querySelector(`[data-filter="${hashFilter}"]`);
        if (targetButton) {
            targetButton.click();
        }
    }
}

/**
 * Add CSS animation keyframes dynamically
 */
function addServiceAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes float {
            0%, 100% {
                transform: translateY(0) rotate(0deg);
            }
            50% {
                transform: translateY(-20px) rotate(5deg);
            }
        }
    `;
    document.head.appendChild(style);
}

// Add animations on page load
addServiceAnimations();

// Export functions for potential use in other scripts
window.NavigationSystem = {
    toggleMobileMenu,
    closeMobileMenu,
    openMobileMenu,
    smoothScrollTo,
    setActiveNavigation
};

window.ServiceSystem = {
    initServiceFilter
};

/**
 * Initialize Contact Form
 */
function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    if (!contactForm) return;
    
    // Add real-time validation
    const formInputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', () => validateField(input));
        input.addEventListener('input', () => clearFieldError(input));
    });
    
    // Handle form submission
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Handle form reset
    contactForm.addEventListener('reset', handleFormReset);
}

/**
 * Validate individual field
 */
function validateField(field) {
    const fieldName = field.name;
    const fieldValue = field.value.trim();
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    // Clear previous error
    clearFieldError(field);
    
    // Required field validation
    if (field.hasAttribute('required') && !fieldValue) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (field.type === 'email' && fieldValue) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fieldValue)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (field.type === 'tel' && fieldValue) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        if (!phoneRegex.test(fieldValue)) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Message length validation
    if (fieldName === 'message' && fieldValue) {
        if (fieldValue.length < 10) {
            showFieldError(field, 'Message must be at least 10 characters long');
            return false;
        }
        if (fieldValue.length > 1000) {
            showFieldError(field, 'Message must be less than 1000 characters');
            return false;
        }
    }
    
    return true;
}

/**
 * Show field error
 */
function showFieldError(field, message) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    field.classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

/**
 * Clear field error
 */
function clearFieldError(field) {
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    field.classList.remove('error');
    if (errorElement) {
        errorElement.textContent = '';
    }
}

/**
 * Handle form submission
 */
function handleFormSubmit(e) {
    e.preventDefault();
    
    const contactForm = e.target;
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    
    // Validate all fields
    const formInputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
    let isValid = true;
    
    formInputs.forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (!isValid) {
        // Focus first error field
        const firstError = contactForm.querySelector('.error');
        if (firstError) {
            firstError.focus();
        }
        return;
    }
    
    // Simulate form submission (replace with actual implementation)
    const formData = new FormData(contactForm);
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    
    // Show loading state
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    // Simulate API call
    setTimeout(() => {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
        
        // Reset button
        submitButton.disabled = false;
        submitButton.innerHTML = originalText;
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Log form data (replace with actual submission)
        console.log('Form submitted with data:', Object.fromEntries(formData));
        
        // Reset form after delay
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
        
    }, 2000);
}

/**
 * Handle form reset
 */
function handleFormReset(e) {
    const contactForm = e.target;
    const formInputs = contactForm.querySelectorAll('.form-input, .form-select, .form-textarea');
    
    // Clear all errors
    formInputs.forEach(input => {
        clearFieldError(input);
    });
    
    // Hide messages
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    if (successMessage) successMessage.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
}

/**
 * Initialize FAQ Accordion
 */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    question.setAttribute('aria-expanded', 'false');
                } else {
                    item.classList.add('active');
                    question.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });
}

/**
 * Initialize Google Map
 */
function initMap() {
    const mapElement = document.getElementById('googleMap');
    
    if (!mapElement) return;
    
    // Check if Google Maps API is loaded
    if (typeof google === 'undefined' || typeof google.maps === 'undefined') {
        // Fallback: show static map image
        mapElement.innerHTML = `
            <div style="width: 100%; height: 100%; background: linear-gradient(135deg, #f1f5f9, #e2e8f0); display: flex; align-items: center; justify-content: center; flex-direction: column; color: #64748b;">
                <i class="fas fa-map-marked-alt" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <p style="text-align: center; padding: 0 2rem;">Interactive Map</p>
                <p style="font-size: 0.875rem; text-align: center; padding: 0 2rem;">123 Tech Street, San Francisco, CA 94105</p>
            </div>
        `;
        return;
    }
    
    // Initialize Google Map
    const companyLocation = { lat: 37.7749, lng: -122.4194 }; // San Francisco coordinates
    
    const map = new google.maps.Map(mapElement, {
        zoom: 15,
        center: companyLocation,
        styles: [
            {
                featureType: "all",
                elementType: "geometry",
                stylers: [{ color: "#f5f5f5" }]
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{ color: "#c9e2f7" }]
            }
        ]
    });
    
    // Add marker
    const marker = new google.maps.Marker({
        position: companyLocation,
        map: map,
        title: "InnovateTech Solutions",
        animation: google.maps.Animation.DROP
    });
    
    // Add info window
    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="padding: 10px; max-width: 200px;">
                <h3 style="margin: 0 0 10px 0; color: #2563eb;">InnovateTech Solutions</h3>
                <p style="margin: 0 0 10px 0; color: #64748b;">123 Tech Street, Suite 100<br>San Francisco, CA 94105</p>
                <a href="tel:+1234567890" style="color: #2563eb; text-decoration: none;">+1 (234) 567-8900</a>
            </div>
        `
    });
    
    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });
}

// Make initMap globally available for Google Maps callback
window.initMap = initMap;