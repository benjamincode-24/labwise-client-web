// Labwise Website Interactive Components
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // WhatsApp Popup Button
    createWhatsAppButton();
    
    // Scroll to Top Button
    createScrollToTopButton();
    
    // Make logo clickable to return home
    makeLogoClickable();
    
    // Initialize Search
    initializeSearch();
    
    // Prevent any accidental form submission or page reload from search
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('click', function(e) {
            e.stopPropagation();
        });
        
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                return false;
            }
        });
        
        // Prevent search results area from triggering logo click
        const searchResults = document.getElementById('searchResults');
        if (searchResults) {
            searchResults.addEventListener('click', function(e) {
                e.stopPropagation();
            });
        }
    }
    
    // Service Filter Functionality
    const serviceFilters = document.querySelectorAll('.service-filter');
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const filterValue = this.getAttribute('data-filter');
            
            // Update active filter
            serviceFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter cards with animation
            serviceCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    card.style.display = 'block';
                    anime({
                        targets: card,
                        opacity: [0, 1],
                        translateY: [20, 0],
                        duration: 300,
                        easing: 'easeOutQuad'
                    });
                } else {
                    anime({
                        targets: card,
                        opacity: [1, 0],
                        translateY: [0, -20],
                        duration: 200,
                        easing: 'easeInQuad',
                        complete: function() {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
    
    // Contact Form Validation and Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Validate form
            if (validateContactForm(data)) {
                // Show success message
                showFormMessage('success', 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
                contactForm.reset();
            } else {
                showFormMessage('error', 'Please fill in all required fields correctly.');
            }
        });
    }
    
    // Appointment Form
    const appointmentForm = document.getElementById('appointmentForm');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateAppointmentForm(data)) {
                showFormMessage('success', 'Appointment request submitted! We will contact you to confirm your appointment.');
                appointmentForm.reset();
            } else {
                showFormMessage('error', 'Please fill in all required fields.');
            }
        });
    }
    
    // Booking Form (detailed booking page)
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            if (validateBookingForm(data)) {
                // Store booking data (in real app, this would go to a server)
                const bookingData = {
                    id: generateBookingId(),
                    ...data,
                    status: 'pending',
                    createdAt: new Date().toISOString()
                };
                
                // Save to localStorage for demo purposes
                saveBooking(bookingData);
                
                showFormMessage('success', `Booking confirmed! Your appointment ID is ${bookingData.id}. We will contact you within 24 hours to confirm your appointment.`);
                bookingForm.reset();
                
                // Reset time slot selection
                document.querySelectorAll('.time-slot').forEach(slot => {
                    slot.classList.remove('selected');
                });
                document.getElementById('selectedTime').value = '';
            } else {
                showFormMessage('error', 'Please fill in all required fields correctly.');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    
    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for scroll animations
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));
    
    // Service card hover effects
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            anime({
                targets: this,
                scale: 1.02,
                boxShadow: '0 10px 30px rgba(60, 32, 85, 0.2)',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
        
        card.addEventListener('mouseleave', function() {
            anime({
                targets: this,
                scale: 1,
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                duration: 200,
                easing: 'easeOutQuad'
            });
        });
    });
});

// Form validation functions
function validateContactForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    return data.name && 
           data.email && 
           emailRegex.test(data.email) && 
           data.message && 
           data.message.length > 10;
}

function validateAppointmentForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    return data.name && 
           data.email && 
           emailRegex.test(data.email) && 
           data.phone && 
           data.service && 
           data.date;
}

function showFormMessage(type, message) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.form-message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `form-message p-4 mb-4 rounded-lg ${
        type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
    }`;
    messageDiv.textContent = message;
    
    // Insert message after the form
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        if (form.id === 'contactForm' || form.id === 'appointmentForm') {
            form.parentNode.insertBefore(messageDiv.cloneNode(true), form.nextSibling);
        }
    });
    
    // Auto-remove message after 5 seconds
    setTimeout(() => {
        const messages = document.querySelectorAll('.form-message');
        messages.forEach(msg => {
            anime({
                targets: msg,
                opacity: [1, 0],
                translateY: [0, -20],
                duration: 300,
                easing: 'easeInQuad',
                complete: function() {
                    msg.remove();
                }
            });
        });
    }, 5000);
}

// Make logo clickable to return to home page
function makeLogoClickable() {
    const logos = document.querySelectorAll('img[alt*="Labwise"]');
    logos.forEach(logo => {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function(e) {
            e.stopPropagation();
            window.location.href = 'index.html';
        });
    });
}

// Initialize map for contact page (now using Google Maps embed)
function initMap() {
    // Map is now handled by Google Maps embed iframe
    // No additional JavaScript needed
}

// Call map initialization when page loads (minimal function now)
window.addEventListener('load', initMap);

// WhatsApp Button Functions
function createWhatsAppButton() {
    const whatsappButton = document.createElement('div');
    whatsappButton.id = 'whatsapp-button';
    whatsappButton.innerHTML = `
        <a href="https://wa.me/15551234567?text=Hello%20Labwise,%20I%20would%20like%20to%20inquire%20about%20your%20services" 
           target="_blank" 
           class="whatsapp-float">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.087"/>
            </svg>
        </a>
    `;
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        #whatsapp-button {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
        }
        
        .whatsapp-float {
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            transition: all 0.3s ease;
            text-decoration: none;
            animation: pulse 2s infinite;
        }
        
        .whatsapp-float:hover {
            background-color: #128C7E;
            transform: scale(1.1);
            box-shadow: 0 6px 20px rgba(37, 211, 102, 0.6);
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(37, 211, 102, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(37, 211, 102, 0);
            }
        }
        
        @media (max-width: 768px) {
            #whatsapp-button {
                bottom: 15px;
                right: 15px;
            }
            
            .whatsapp-float {
                width: 50px;
                height: 50px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(whatsappButton);
}

// Scroll to Top Button Functions
function createScrollToTopButton() {
    const scrollButton = document.createElement('div');
    scrollButton.id = 'scroll-to-top-button';
    scrollButton.innerHTML = `
        <button class="scroll-to-top-float" aria-label="Scroll to top">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M12 19V5M5 12l7-7 7 7"/>
            </svg>
        </button>
    `;
    
    // Add CSS styles
    const style = document.createElement('style');
    style.textContent = `
        #scroll-to-top-button {
            position: fixed;
            bottom: 90px;
            right: 20px;
            z-index: 1000;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease, visibility 0.3s ease;
        }
        
        #scroll-to-top-button.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top-float {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #3c2055, #a63b8d);
            color: white;
            border: none;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(60, 32, 85, 0.4);
            transition: all 0.3s ease;
            cursor: pointer;
        }
        
        .scroll-to-top-float:hover {
            background: linear-gradient(135deg, #a63b8d, #3c2055);
            transform: translateY(-5px);
            box-shadow: 0 6px 20px rgba(60, 32, 85, 0.6);
        }
        
        .scroll-to-top-float:active {
            transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
            #scroll-to-top-button {
                bottom: 75px;
                right: 15px;
            }
            
            .scroll-to-top-float {
                width: 50px;
                height: 50px;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(scrollButton);
    
    // Add scroll event listener
    const button = scrollButton.querySelector('.scroll-to-top-float');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollButton.classList.add('visible');
        } else {
            scrollButton.classList.remove('visible');
        }
    });
    
    // Add click event to scroll to top
    button.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Booking Form Validation
function validateBookingForm(data) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    return data.fullName && 
           data.email && 
           emailRegex.test(data.email) && 
           data.phone && 
           data.service && 
           data.appointmentDate && 
           data.appointmentTime &&
           data.terms;
}

// Generate Booking ID
function generateBookingId() {
    return 'LW' + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase();
}

// Save Booking (localStorage for demo)
function saveBooking(bookingData) {
    let bookings = JSON.parse(localStorage.getItem('labwiseBookings') || '[]');
    bookings.push(bookingData);
    localStorage.setItem('labwiseBookings', JSON.stringify(bookings));
}

// Search Functionality
const searchData = [
    { term: 'appointment', page: 'booking.html', description: 'Book an appointment' },
    { term: 'booking', page: 'booking.html', description: 'Book an appointment' },
    { term: 'doctor', page: 'about.html', description: 'Meet our doctors' },
    { term: 'contact', page: 'contact.html', description: 'Contact information' },
    { term: 'faq', page: 'faq.html', description: 'Frequently asked questions' },
    { term: 'news', page: 'news.html', description: 'Latest news' },
    { term: 'services', page: 'index.html', description: 'Our services' },
    { term: 'pediatric', page: 'index.html', description: 'Pediatric services' },
    { term: 'dermatology', page: 'index.html', description: 'Dermatology services' },
    { term: 'emergency', page: 'index.html', description: 'Emergency services' }
];

function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Prevent form submission on Enter key
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
        }
    });
    
    searchInput.addEventListener('input', function(e) {
        e.preventDefault();
        const query = this.value.toLowerCase().trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        const matches = searchData.filter(item => 
            item.term.toLowerCase().includes(query)
        ).slice(0, 5);
        
        if (matches.length > 0) {
            searchResults.innerHTML = matches.map(match => 
                `<div class="p-3 hover:bg-gray-100 cursor-pointer border-b" onclick="event.preventDefault(); window.location.href='${match.page}'">
                    <div class="font-medium text-purple-600">${match.description}</div>
                </div>`
            ).join('');
            searchResults.style.display = 'block';
        } else {
            searchResults.innerHTML = '<div class="p-3 text-gray-500">No results found</div>';
            searchResults.style.display = 'block';
        }
    });
    
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.style.display = 'none';
        }
    });
}

