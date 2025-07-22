// Promotional Banner Slideshow JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const banners = document.querySelectorAll('.banner-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    // Initialize first slide
    if (banners.length > 0) {
        banners[0].classList.add('active');
        if (dots.length > 0) {
            dots[0].classList.add('active');
        }
    }

    // Function to show specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        banners.forEach((banner, i) => {
            banner.classList.remove('active', 'prev');
            if (i < index) {
                banner.classList.add('prev');
            }
        });
        
        dots.forEach(dot => {
            dot.classList.remove('active');
        });

        // Add active class to current slide and dot
        if (banners[index]) {
            banners[index].classList.add('active');
        }
        if (dots[index]) {
            dots[index].classList.add('active');
        }
        
        currentSlide = index;
    }

    // Function to go to next slide
    function nextSlide() {
        const nextIndex = (currentSlide + 1) % banners.length;
        showSlide(nextIndex);
    }

    // Function to go to previous slide
    function prevSlide() {
        const prevIndex = (currentSlide - 1 + banners.length) % banners.length;
        showSlide(prevIndex);
    }

    // Start automatic slideshow
    function startSlideshow() {
        slideInterval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    }

    // Stop automatic slideshow
    function stopSlideshow() {
        if (slideInterval) {
            clearInterval(slideInterval);
        }
    }

    // Add click event listeners to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            stopSlideshow();
            showSlide(index);
            startSlideshow(); // Restart auto-slideshow after manual selection
        });
    });

    // Pause slideshow on hover
    const bannerSection = document.querySelector('.promotional-banners-section');
    if (bannerSection) {
        bannerSection.addEventListener('mouseenter', stopSlideshow);
        bannerSection.addEventListener('mouseleave', startSlideshow);
    }

    // Start the slideshow
    startSlideshow();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        const bannerSection = document.querySelector('.promotional-banners-section');
        if (bannerSection && isElementInViewport(bannerSection)) {
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                stopSlideshow();
                prevSlide();
                startSlideshow();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                stopSlideshow();
                nextSlide();
                startSlideshow();
            }
        }
    });

    // Helper function to check if element is in viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Add touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (bannerSection) {
        bannerSection.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });

        bannerSection.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            stopSlideshow();
            if (diff > 0) {
                // Swipe left - go to next slide
                nextSlide();
            } else {
                // Swipe right - go to previous slide
                prevSlide();
            }
            startSlideshow();
        }
    }

    // Add animation class after page load for smooth entrance
    setTimeout(function() {
        banners.forEach(banner => {
            banner.style.transition = 'all 0.8s ease-in-out';
        });
    }, 100);
});
