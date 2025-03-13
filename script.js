
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Active navigation based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // Project filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to the clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = this.querySelector('input[type="text"]');
            const emailInput = this.querySelector('input[type="email"]');
            const messageInput = this.querySelector('textarea');
            
            let isValid = true;
            
            // Simple validation
            if (nameInput.value.trim() === '') {
                isValid = false;
                nameInput.style.borderColor = 'red';
            } else {
                nameInput.style.borderColor = '#e0e0e0';
            }
            
            if (emailInput.value.trim() === '' || !isValidEmail(emailInput.value)) {
                isValid = false;
                emailInput.style.borderColor = 'red';
            } else {
                emailInput.style.borderColor = '#e0e0e0';
            }
            
            if (messageInput.value.trim() === '') {
                isValid = false;
                messageInput.style.borderColor = 'red';
            } else {
                messageInput.style.borderColor = '#e0e0e0';
            }
            
            if (isValid) {
                // Here you would normally send the form data to a server
                // For this example, we'll just show a success message
                contactForm.innerHTML = '<div style="text-align: center; padding: 30px;"><h3 style="margin-bottom: 20px; color: #5e60ce;">Message Sent Successfully!</h3><p>Thanks for contacting me. I\'ll get back to you soon.</p></div>';
            }
        });
    }
    
    // Helper function to validate email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Theme switcher (light/dark mode)
    const themeSwitch = document.querySelector('.theme-switch');
    
    if (themeSwitch) {
        // Check for saved theme preference or use default
        const currentTheme = localStorage.getItem('theme') || 'light';
        
        // Set initial theme
        if (currentTheme === 'dark') {
            document.body.classList.add('dark-theme');
            themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
        }
        
        themeSwitch.addEventListener('click', function() {
            // Toggle theme
            document.body.classList.toggle('dark-theme');
            
            // Save preference
            if (document.body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeSwitch.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                localStorage.setItem('theme', 'light');
                themeSwitch.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }
    
    // Skill bar animation
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 500);
        });
    }
    
    // Animate skill bars when skills section is in view
    const skillsSection = document.getElementById('skills');
    
    if (skillsSection) {
        window.addEventListener('scroll', function() {
            const sectionPos = skillsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;
            
            if (sectionPos < screenPos) {
                animateSkillBars();
                // Remove event listener after animation
                this.removeEventListener('scroll', arguments.callee);
            }
        });
    }
});