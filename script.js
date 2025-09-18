// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(50px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Planet information
    const planetData = {
        Mercury: {
            name: "Mercury",
            description: "The smallest planet in our solar system and closest to the Sun. Mercury has extreme temperature variations and no atmosphere."
        },
        Venus: {
            name: "Venus",
            description: "Known as Earth's twin, Venus has a thick, toxic atmosphere and is the hottest planet in our solar system."
        },
        Earth: {
            name: "Earth",
            description: "Our home planet, the only known planet with life. Earth has liquid water, a protective atmosphere, and diverse ecosystems."
        },
        Mars: {
            name: "Mars",
            description: "The Red Planet, known for its rusty color from iron oxide. Mars has the largest volcano and canyon in the solar system."
        },
        Jupiter: {
            name: "Jupiter",
            description: "The largest planet in our solar system, a gas giant with a Great Red Spot storm and over 80 moons."
        },
        Saturn: {
            name: "Saturn",
            description: "Famous for its spectacular ring system, Saturn is a gas giant with over 80 moons including Titan."
        }
    };

    // Planet click handlers
    document.querySelectorAll('.planet').forEach(planet => {
        planet.addEventListener('click', function() {
            const planetName = this.getAttribute('data-planet');
            const planetInfo = planetData[planetName];
            
            if (planetInfo) {
                document.getElementById('planet-name').textContent = planetInfo.name;
                document.getElementById('planet-description').textContent = planetInfo.description;
                
                // Add glow effect
                document.querySelectorAll('.planet').forEach(p => p.classList.remove('selected'));
                this.classList.add('selected');
                
                // Animate planet info
                const infoDiv = document.getElementById('planet-info');
                infoDiv.style.transform = 'scale(0.9)';
                infoDiv.style.opacity = '0.7';
                setTimeout(() => {
                    infoDiv.style.transform = 'scale(1)';
                    infoDiv.style.opacity = '1';
                }, 200);
            }
        });
    });

    // Mission progress animation
    const progressBars = document.querySelectorAll('.progress');
    const progressObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const width = progress.style.width;
                progress.style.width = '0%';
                setTimeout(() => {
                    progress.style.width = width;
                }, 500);
            }
        });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
        progressObserver.observe(bar);
    });

    // Contact form submission
    document.getElementById('contactForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // Simulate form submission
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        submitBtn.textContent = 'Transmitting...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.textContent = 'Transmission Sent! 🚀';
            submitBtn.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
            
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(45deg, #00d4ff, #0099cc)';
                this.reset();
            }, 2000);
        }, 1500);
    });

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('.hero');
        const speed = scrolled * 0.5;
        
        if (parallax) {
            parallax.style.transform = `translateY(${speed}px)`;
        }
    });

    // Add floating animation to mission cards
    document.querySelectorAll('.mission-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('float-animation');
    });

    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    const titleText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < titleText.length) {
            heroTitle.textContent += titleText.charAt(i);
            i++;
            setTimeout(typeWriter, 100);
        }
    };
    
    setTimeout(typeWriter, 1000);
});

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

function openModal(imageId) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const caption = document.getElementById('modalCaption');
    
    // Create placeholder images for gallery
    const images = {
        img1: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="nebula" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ff6b6b"/><stop offset="50%" stop-color="%234ecdc4"/><stop offset="100%" stop-color="%23000"/></radialGradient></defs><rect width="400" height="300" fill="url(%23nebula)"/><text x="200" y="150" text-anchor="middle" fill="white" font-size="24">Nebula Formation</text></svg>',
        img2: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="blackhole" cx="50%" cy="50%"><stop offset="0%" stop-color="%23000"/><stop offset="30%" stop-color="%234a4a4a"/><stop offset="100%" stop-color="%2300d4ff"/></radialGradient></defs><rect width="400" height="300" fill="url(%23blackhole)"/><circle cx="200" cy="150" r="30" fill="black"/><text x="200" y="250" text-anchor="middle" fill="white" font-size="24">Black Hole</text></svg>',
        img3: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="cluster" cx="50%" cy="50%"><stop offset="0%" stop-color="%23ffd700"/><stop offset="50%" stop-color="%23ff8c00"/><stop offset="100%" stop-color="%23ff4500"/></radialGradient></defs><rect width="400" height="300" fill="url(%23cluster)"/><text x="200" y="150" text-anchor="middle" fill="white" font-size="24">Star Cluster</text></svg>',
        img4: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><radialGradient id="spiral" cx="50%" cy="50%"><stop offset="0%" stop-color="%239b59b6"/><stop offset="50%" stop-color="%233498db"/><stop offset="100%" stop-color="%232ecc71"/></radialGradient></defs><rect width="400" height="300" fill="url(%23spiral)"/><text x="200" y="150" text-anchor="middle" fill="white" font-size="24">Galaxy Spiral</text></svg>'
    };
    
    const captions = {
        img1: 'A stunning nebula formation where new stars are born',
        img2: 'A mysterious black hole warping space and time',
        img3: 'A brilliant cluster of young, hot stars',
        img4: 'A beautiful spiral galaxy millions of light-years away'
    };
    
    modal.style.display = 'block';
    modalImg.src = images[imageId];
    caption.textContent = captions[imageId];
    
    // Add fade-in animation
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
});

// Add CSS for additional animations
const additionalStyles = `
    .selected {
        filter: brightness(1.5) drop-shadow(0 0 20px currentColor);
        transform: scale(1.2);
    }
    
    .float-animation {
        animation: floatCard 6s ease-in-out infinite;
    }
    
    @keyframes floatCard {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
    }
    
    .modal {
        transition: opacity 0.3s ease;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Add particle effect
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.3};
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Add twinkle animation
const twinkleStyles = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
    }
`;

const twinkleStyleSheet = document.createElement('style');
twinkleStyleSheet.textContent = twinkleStyles;
document.head.appendChild(twinkleStyleSheet);

// Initialize particles
createParticles();