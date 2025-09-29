document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Efek Highlight Bubble pada Navbar ---
    const sections = document.querySelectorAll('#about, #timeline, #portfolio, #contact');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const activeBubble = document.getElementById('active-bubble');
    const navUl = document.querySelector('.navbar-nav');

    function updateActiveBubble() {
        if (!navUl || !activeBubble) return;

        let activeLink = null;
        
        sections.forEach(section => {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const sectionTop = section.offsetTop - navbarHeight - 50;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${section.id}`) {
                        activeLink = link;
                    }
                });
            }
        });
        
        if (activeLink) {
            navLinks.forEach(link => link.classList.remove('active'));
            activeLink.classList.add('active');
            
            const linkRect = activeLink.getBoundingClientRect();
            const navUlRect = navUl.getBoundingClientRect();
            
            const leftPosition = linkRect.left - navUlRect.left;
            
            activeBubble.style.transform = `translateY(-50%) translateX(${leftPosition}px)`;
            activeBubble.style.width = `${linkRect.width}px`;
        } else {
             activeBubble.style.width = '0px';
        }
    }
    
    updateActiveBubble();

    window.addEventListener('scroll', updateActiveBubble);
    window.addEventListener('resize', updateActiveBubble);

    // Form validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            if (name && email && message) {
                alert('Pesan Anda berhasil dikirim! Terima kasih.');
                contactForm.reset();
            } else {
                alert('Silakan lengkapi semua field!');
            }
        });
    }
});