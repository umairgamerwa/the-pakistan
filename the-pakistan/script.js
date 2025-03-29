document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Counter Animation
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    function animateCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const increment = target / speed;
            
            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(animateCounters, 1);
            } else {
                counter.innerText = target;
            }
        });
    }
    
    // Start counter animation when stats bar is in view
    const statsBar = document.querySelector('.stats-bar');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateCounters();
            observer.unobserve(statsBar);
        }
    });
    
    observer.observe(statsBar);
    
    // Tab System for Experiences
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            tabPanes[index].classList.add('active');
        });
    });
    
    // Gallery Items (would be loaded from API in real scenario)
    const galleryContainer = document.querySelector('.gallery-container');
    const galleryItems = [
        { img: 'assets/images/gallery1.jpg', alt: 'Northern Pakistan' },
        { img: 'assets/images/gallery2.jpg', alt: 'Hunza Valley' },
        { img: 'assets/images/gallery3.jpg', alt: 'Fairy Meadows' },
        { img: 'assets/images/gallery4.jpg', alt: 'Badshahi Mosque' },
        { img: 'assets/images/gallery5.jpg', alt: 'Lahore Fort' },
        { img: 'assets/images/gallery6.jpg', alt: 'Karachi Beach' },
    ];
    
    function loadGalleryItems(items) {
        galleryContainer.innerHTML = '';
        items.forEach(item => {
            const galleryItem = document.createElement('div');
            galleryItem.className = 'gallery-item';
            galleryItem.innerHTML = `
                <img src="${item.img}" alt="${item.alt}">
                <div class="overlay">
                    <i class="fas fa-search-plus"></i>
                </div>
            `;
            galleryContainer.appendChild(galleryItem);
        });
    }
    
    // Initial load
    loadGalleryItems(galleryItems);
    
    // Load more button functionality
    const loadMoreBtn = document.querySelector('.load-more');
    loadMoreBtn.addEventListener('click', () => {
        // In a real scenario, this would load more items from an API
        const moreItems = [
            { img: 'assets/images/gallery7.jpg', alt: 'Skardu' },
            { img: 'assets/images/gallery8.jpg', alt: 'Naltar Valley' },
            { img: 'assets/images/gallery9.jpg', alt: 'Shandur Pass' },
        ];
        moreItems.forEach(item => galleryItems.push(item));
        loadGalleryItems(galleryItems);
        loadMoreBtn.textContent = 'No More Items';
        loadMoreBtn.disabled = true;
    });
    
    // Testimonial Slider
    const sliderTrack = document.querySelector('.slider-track');
    const testimonials = [
        {
            quote: "Pakistan's northern areas are the most beautiful places I've ever seen. The people are incredibly hospitable and the landscapes are breathtaking.",
            author: "Sarah Johnson, UK"
        },
        {
            quote: "The historical sites in Pakistan are truly remarkable. The Lahore Fort and Badshahi Mosque left me speechless with their grandeur.",
            author: "Michael Chen, USA"
        },
        {
            quote: "I came for the mountains but fell in love with the culture. The food, music, and traditions of Pakistan are as rich as its landscapes.",
            author: "Emma Rodriguez, Spain"
        }
    ];
    
    // Load testimonials into slider
    testimonials.forEach(testimonial => {
        const testimonialItem = document.createElement('div');
        testimonialItem.className = 'testimonial-item';
        testimonialItem.innerHTML = `
            <p class="quote">"${testimonial.quote}"</p>
            <p class="author">- ${testimonial.author}</p>
        `;
        sliderTrack.appendChild(testimonialItem);
    });
    
    // Slider navigation
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    
    function updateSlider() {
        sliderTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    
    nextBtn.addEventListener('click', () =>