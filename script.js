// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Hero Carousel Logic
const slides = document.querySelectorAll('.carousel-slide');
let currentSlide = 0;

function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}

setInterval(nextSlide, 5000);

// Counter Animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

const startCounters = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Intersection Observer for stats
const statsSection = document.querySelector('.stats');
const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
        startCounters();
        observer.unobserve(statsSection);
    }
}, { threshold: 0.5 });

observer.observe(statsSection);

// Scroll Reveal Logic
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => revealObserver.observe(el));


// Product Modal Data
const yachtData = {
    'solstice': {
        name: 'The Solstice',
        length: '72m',
        guests: '12',
        description: 'The Solstice is a pinnacle of modern naval architecture. With its sleek lines and expansive deck spaces, it offers an unparalleled connection to the sea.',
        specs: {
            'Year Built': '2022',
            'Max Speed': '20 Knots',
            'Crew': '18',
            'Staterooms': '6 VIP'
        },
        activities: ['Jet Skiing', 'Scuba Diving', 'Onboard Spa', 'Helipad Access'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Placeholder
        img: 'assets/yacht1.png'
    },
    'ocean-princess': {
        name: 'Ocean Princess',
        length: '65m',
        guests: '10',
        description: 'Designed for adventure and family fun, Ocean Princess comes equipped with the latest water toys and a massive inflatable slide.',
        specs: {
            'Year Built': '2021',
            'Max Speed': '18 Knots',
            'Crew': '15',
            'Staterooms': '5 Suite'
        },
        activities: ['Slide & Toys', 'Outdoor Cinema', 'Beach Club', 'Yoga Deck'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        img: 'assets/activities.png'
    },
    'azure-dream': {
        name: 'Azure Dream',
        length: '80m',
        guests: '16',
        description: 'Azure Dream offers the ultimate in privacy and sophistication, with marble-clad interiors and a world-class culinary team.',
        specs: {
            'Year Built': '2023',
            'Max Speed': '22 Knots',
            'Crew': '22',
            'Staterooms': '8 Ultra-VIP'
        },
        activities: ['Michelin Dining', 'Wine Cellar', 'Glass-bottom Pool', 'Fitness Center'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        img: 'assets/interior.png'
    },
    'midnight-star': {
        name: 'Midnight Star',
        length: '55m',
        guests: '8',
        description: 'Midnight Star is built for those who love speed without compromising on luxury. Its nimble design allows it to enter smaller bays and ports that larger vessels cannot reach.',
        specs: {
            'Year Built': '2024',
            'Max Speed': '32 Knots',
            'Crew': '10',
            'Staterooms': '4 VIP'
        },
        activities: ['Speed Boat Tenders', 'Wakeboarding', 'Night Vision Navigation', 'Sky Lounge'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        img: 'assets/hero.png'
    },
    'emerald-sea': {
        name: 'Emerald Sea',
        length: '90m',
        guests: '20',
        description: 'The Emerald Sea is a floating palace. It offers the most comprehensive set of amenities available on the water today, including a full-sized theater and a wellness center.',
        specs: {
            'Year Built': '2023',
            'Max Speed': '19 Knots',
            'Crew': '30',
            'Staterooms': '10 Master-Class'
        },
        activities: ['Full Gym & Spa', 'Private Theater', 'Glass Elevator', 'Submarine Excursions'],
        videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
        img: 'assets/yacht1.png'
    }
};

const modal = document.getElementById('productModal');
const modalBody = document.getElementById('modalBody');

function openModal(id) {
    const data = yachtData[id];
    modalBody.innerHTML = `
        <div class="modal-body">
            <div class="modal-images">
                <img src="${data.img}" alt="${data.name}">
                <h3>Activities</h3>
                <ul style="list-style: none; margin-top: 1rem;">
                    ${data.activities.map(a => `<li style="margin-bottom: 0.5rem;"><i class="fas fa-check" style="color: #c9a66b; margin-right: 0.5rem;"></i> ${a}</li>`).join('')}
                </ul>
            </div>
            <div class="modal-details">
                <h2>${data.name}</h2>
                <p>${data.description}</p>
                <div class="spec-list">
                    ${Object.entries(data.specs).map(([label, value]) => `
                        <div class="spec-item">
                            <span class="spec-label">${label}</span>
                            <span class="spec-value">${value}</span>
                        </div>
                    `).join('')}
                </div>
                <div class="video-container">
                    <iframe src="${data.videoUrl}" frameborder="0" allowfullscreen></iframe>
                </div>
                <a href="https://wa.me/1234567890" class="btn-primary" style="margin-top: 2rem; width: 100%; text-align: center;">Inquire Now</a>
            </div>
        </div>
    `;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on outside click
window.onclick = (event) => {
    if (event.target == modal) {
        closeModal();
    }
};
