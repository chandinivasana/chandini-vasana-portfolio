// script.js
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const links = document.querySelectorAll('a, button, .project-item');

if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1,
            ease: "power2.out"
        });
        gsap.to(cursorFollower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3,
            ease: "power2.out"
        });
    });

    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hovered');
            cursorFollower.classList.add('hovered');
        });
        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hovered');
            cursorFollower.classList.remove('hovered');
        });
    });
}

// Initialize Lenis Smooth Scroll
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smooth: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Integrate Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0, 0);

// Animations

// Hero Reveal
const tl = gsap.timeline();

tl.from(".hero-title .line", {
    y: 200,
    duration: 1.5,
    stagger: 0.2,
    ease: "power4.out",
    delay: 0.2
})
.from(".hero-top, .hero-bottom", {
    opacity: 0,
    y: 20,
    duration: 1,
    ease: "power2.out"
}, "-=1");

// Fade Up Elements
gsap.utils.toArray('.fade-up').forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });
});

// Text Reveal Animation for sections
gsap.utils.toArray('.text-reveal').forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: "top 80%",
        },
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
    });
});

// Parallax effect on large text
gsap.to(".huge-text", {
    scrollTrigger: {
        trigger: ".contact-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1
    },
    y: -100,
    ease: "none"
});

// Smooth scroll to sections for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        lenis.scrollTo(this.getAttribute('href'));
    });
});
