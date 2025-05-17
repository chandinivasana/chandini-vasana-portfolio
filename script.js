document.addEventListener('DOMContentLoaded', () => {
    // ... (all your existing JS code for navbar, smooth scroll, mobile nav, back-to-top)

    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('#navbar nav ul li a');
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navMenu = document.querySelector('#navbar nav');
    const backToTopButton = document.querySelector('.back-to-top');
    // const themeToggleButton = document.querySelector('.theme-toggle'); // Removed for this dark-theme only version
    // const sunIcon = themeToggleButton.querySelector('.fa-sun');
    // const moonIcon = themeToggleButton.querySelector('.fa-moon');
    const allSections = document.querySelectorAll('main section'); // Renamed from 'sections' to avoid conflict

    // Sticky Navbar & Back to Top Button Visibility
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }

        // Active link highlighting
        let currentSectionId = '';
        allSections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Adjust offset for better accuracy with fixed navbar
            if (pageYOffset >= (sectionTop - navbar.offsetHeight - sectionHeight / 3)) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSectionId) {
                link.classList.add('active');
            }
        });
         // Special case for hero section when at top
        if (window.scrollY < allSections[0].offsetTop + allSections[0].offsetHeight / 2 - navbar.offsetHeight) {
             navLinks.forEach(link => link.classList.remove('active'));
             if (navLinks[0] && navLinks[0].getAttribute('href') === '#hero') {
                 navLinks[0].classList.add('active');
             }
        }
    });

    // Smooth scrolling for nav links and back-to-top
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                let targetPosition = targetElement.offsetTop - navbarHeight;

                // Ensure not scrolling too far up for the hero section
                if (targetId === '#hero') {
                    targetPosition = 0;
                } else {
                    targetPosition +=1; // Small offset for non-hero sections
                }


                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                 // Close mobile nav if open after click
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    mobileNavToggle.classList.remove('active'); // For X icon toggle
                    // mobileNavToggle.querySelector('i').classList.replace('fa-times', 'fa-bars');
                }
            }
        });
    });

    // Mobile Navigation Toggle
    mobileNavToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileNavToggle.classList.toggle('active'); // For X icon toggle
        // const icon = mobileNavToggle.querySelector('i');
        // if (navMenu.classList.contains('active')) {
        //     icon.classList.remove('fa-bars');
        //     icon.classList.add('fa-times');
        // } else {
        //     icon.classList.remove('fa-times');
        //     icon.classList.add('fa-bars');
        // }
    });

    // Update current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // Advanced Scroll Reveal for sections
    const revealSections = document.querySelectorAll('.content-section');
    const revealObserverOptions = {
        root: null, // relative to document viewport
        rootMargin: '0px',
        threshold: 0.15 // 15% of item is visible
    };

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealObserverOptions);
    revealSections.forEach(section => {
        revealObserver.observe(section);
    });

});