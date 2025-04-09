document.addEventListener('DOMContentLoaded', function() {

    // Federal banner opening functionality
    const bannerButton = document.querySelector('.usa-banner__button');
    const bannerContent = document.getElementById('gov-banner');
    const cmsHeader = document.querySelector('.cms-header');
    let bannerExpanded = false;
    
    if (bannerButton && bannerContent) {
        bannerContent.style.display = 'none';
        
        bannerButton.addEventListener('click', function() {
            bannerExpanded = !bannerExpanded;
            this.setAttribute('aria-expanded', bannerExpanded);
            
            // hacky but only way i got this to expand and close with the custom banner
            if (bannerExpanded) {
                bannerContent.style.display = 'block';
                if (cmsHeader) {
                    cmsHeader.style.top = bannerContent.offsetHeight + 24 + 'px';
                }
            } else {
                bannerContent.style.display = 'none';
                if (cmsHeader) {
                    cmsHeader.style.top = '24px';
                }
            }
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');
    
    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            mainMenu.classList.toggle('show');
        });
        
        document.addEventListener('click', function(e) {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target) && mainMenu.classList.contains('show')) {
                mainMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(href);
                if (targetElement) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const bannerHeight = document.querySelector('.usa-banner').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerHeight - bannerHeight - 20;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                }
            }
        });
    });
    
    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .doc-card, .tool-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');
        
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });
    
    // dynamic nav bar based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav ul li a');
    
    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        const headerHeight = document.querySelector('header').offsetHeight;
        const bannerHeight = document.querySelector('.usa-banner').offsetHeight;
        const totalOffset = headerHeight + bannerHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - totalOffset - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                navItems.forEach(item => {
                    item.removeAttribute('aria-current');
                    
                    if (item.getAttribute('href') === '#' + section.id) {
                        item.setAttribute('aria-current', 'page');
                    }
                });
            }
        });
        
        if (scrollPosition < 100) {
            navItems.forEach(item => {
                item.removeAttribute('aria-current');
                if (item.getAttribute('href') === '#') {
                    item.setAttribute('aria-current', 'page');
                }
            });
        }
    }
    
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem(); 
});