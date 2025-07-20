// Review System for Namaste Café - Simplified and Force Display
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, starting review system...');
    
    // Multiple initialization attempts to ensure it works
    setTimeout(initializeReviews, 100);
    setTimeout(initializeReviews, 500);
    setTimeout(initializeReviews, 1000);
    
    setupReviewModal();
});

// Also try when window is fully loaded
window.addEventListener('load', function() {
    console.log('Window fully loaded, initializing reviews again...');
    setTimeout(initializeReviews, 100);
});

function initializeReviews() {
    console.log('=== INITIALIZING REVIEWS ===');
    
    // Default reviews
    const defaultReviews = [
        {
            id: 1,
            name: "Priya Sharma",
            description: "Amazing authentic Indian chai! The masala chai tastes exactly like what my grandmother used to make. The ambiance is perfect for a cozy evening. Highly recommended!",
            rating: 5,
            date: "2024-12-15"
        },
        {
            id: 2,
            name: "David Rodriguez", 
            description: "Great place for Indian breakfast! The dosas are crispy and perfectly prepared. The filter coffee is exceptional. Staff is very friendly and welcoming.",
            rating: 4,
            date: "2024-12-10"
        }
    ];

    // Force set default reviews if none exist
    let reviews = JSON.parse(localStorage.getItem('namasteReviews')) || [];
    if (reviews.length === 0) {
        console.log('No reviews found, setting defaults...');
        reviews = defaultReviews;
        localStorage.setItem('namasteReviews', JSON.stringify(defaultReviews));
    }

    console.log('Reviews to display:', reviews);
    
    // Force display reviews
    forceDisplayReviews(reviews);
}

function forceDisplayReviews(reviews) {
    console.log('=== FORCE DISPLAYING REVIEWS ===');
    console.log('Reviews:', reviews);
    
    // Calculate and update overall rating
    const overallRating = calculateOverallRating(reviews);
    console.log('Overall rating:', overallRating);
    
    // Update overall rating elements
    updateElement('overall-rating', overallRating.toFixed(1));
    updateElement('total-reviews', reviews.length);
    
    const overallStarsElement = document.getElementById('overall-stars');
    if (overallStarsElement) {
        overallStarsElement.innerHTML = generateStars(overallRating);
        console.log('Updated overall stars');
    }
    
    // Get reviews list container
    const reviewsList = document.getElementById('reviews-list');
    if (!reviewsList) {
        console.error('CRITICAL: reviews-list element not found!');
        return;
    }
    
    console.log('Found reviews-list element:', reviewsList);
    
    // Force clear and rebuild reviews
    reviewsList.innerHTML = '';
    reviewsList.style.display = 'block';
    reviewsList.style.visibility = 'visible';
    reviewsList.style.opacity = '1';
    
    // Add each review with force visibility
    reviews.forEach((review, index) => {
        console.log(`Creating review ${index + 1}:`, review);
        
        const reviewDiv = document.createElement('div');
        reviewDiv.className = 'review-item animate-box';
        reviewDiv.style.display = 'block';
        reviewDiv.style.visibility = 'visible';
        reviewDiv.style.opacity = '1';
        reviewDiv.style.marginBottom = '20px';
        reviewDiv.style.padding = '20px 0';
        reviewDiv.style.borderBottom = '1px solid #D2B48C';
        
        const starsHtml = generateStars(review.rating);
        const formattedDate = formatDate(review.date);
        
        reviewDiv.innerHTML = `
            <div class="review-header" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; flex-wrap: wrap;">
                <h5 style="font-family: 'Cormorant Garamond', serif; font-size: 20px; color: #8B4513; margin: 0; font-weight: 600;">${review.name}</h5>
                <div class="review-stars" style="font-size: 16px;">${starsHtml}</div>
                <span class="review-date" style="color: #8B4513; font-size: 14px; opacity: 0.8;">${formattedDate}</span>
            </div>
            <p class="review-text" style="color: #333333; line-height: 1.6; margin: 0; font-size: 15px;">${review.description}</p>
        `;
        
        reviewsList.appendChild(reviewDiv);
        console.log(`Added review ${index + 1} to DOM`);
    });
    
    console.log('Final reviews-list innerHTML:', reviewsList.innerHTML);
    console.log('Reviews display completed');
}

function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
        console.log(`Updated ${id} to:`, value);
    } else {
        console.error(`Element ${id} not found`);
    }
}

function calculateOverallRating(reviews) {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
}

function generateStars(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHtml += '<i class="icon-star" style="color: #8B4513;"></i>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHtml += '<i class="icon-star-half" style="color: #8B4513;"></i>';
    }
    
    // Empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
        starsHtml += '<i class="icon-star-o" style="color: #D2B48C;"></i>';
    }
    
    return starsHtml;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function setupReviewModal() {
    console.log('Setting up review modal...');
    
    const modal = document.getElementById('reviewModal');
    const btn = document.getElementById('give-rating-btn');
    const span = document.getElementsByClassName('close')[0];
    const submitBtn = document.getElementById('submit-review');
    
    if (!modal) {
        console.error('reviewModal not found');
        return;
    }
    
    if (!btn) {
        console.error('give-rating-btn not found');
        return;
    }
    
    // Open modal
    btn.onclick = function() {
        console.log('Opening review modal...');
        modal.style.display = 'block';
    }
    
    // Close modal
    if (span) {
        span.onclick = function() {
            modal.style.display = 'none';
            resetForm();
        }
    }
    
    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
            resetForm();
        }
    }
    
    // Handle star selection
    setupStarSelection();
    
    // Handle form submission
    if (submitBtn) {
        submitBtn.onclick = function() {
            submitReview();
        }
    }
    
    console.log('Review modal setup complete');
}

function setupStarSelection() {
    const stars = document.querySelectorAll('.modal-star');
    let selectedRating = 0;
    
    if (stars.length === 0) {
        console.error('Modal stars not found');
        return;
    }
    
    stars.forEach((star, index) => {
        star.addEventListener('mouseenter', function() {
            highlightStars(index + 1);
        });
        
        star.addEventListener('mouseleave', function() {
            highlightStars(selectedRating);
        });
        
        star.addEventListener('click', function() {
            selectedRating = index + 1;
            const selectedRatingInput = document.getElementById('selected-rating');
            if (selectedRatingInput) {
                selectedRatingInput.value = selectedRating;
            }
            highlightStars(selectedRating);
        });
    });
    
    function highlightStars(rating) {
        stars.forEach((star, index) => {
            if (index < rating) {
                star.style.color = '#8B4513';
            } else {
                star.style.color = '#D2B48C';
            }
        });
    }
}

function submitReview() {
    const name = document.getElementById('reviewer-name').value.trim();
    const description = document.getElementById('review-description').value.trim();
    const rating = parseInt(document.getElementById('selected-rating').value);
    
    // Validation
    if (!name) {
        alert('Please enter your name');
        return;
    }
    
    if (!description) {
        alert('Please enter a review description');
        return;
    }
    
    if (!rating || rating < 1 || rating > 5) {
        alert('Please select a rating');
        return;
    }
    
    // Create new review object
    const newReview = {
        id: Date.now(),
        name: name,
        description: description,
        rating: rating,
        date: new Date().toISOString().split('T')[0]
    };
    
    // Save to localStorage
    let reviews = JSON.parse(localStorage.getItem('namasteReviews')) || [];
    reviews.push(newReview);
    localStorage.setItem('namasteReviews', JSON.stringify(reviews));
    
    console.log('New review saved:', newReview);
    
    // Force refresh display
    forceDisplayReviews(reviews);
    
    // Close modal and reset form
    document.getElementById('reviewModal').style.display = 'none';
    resetForm();
    
    // Show success message
    alert('Thank you for your review!');
}

function resetForm() {
    const nameInput = document.getElementById('reviewer-name');
    const descInput = document.getElementById('review-description');
    const ratingInput = document.getElementById('selected-rating');
    
    if (nameInput) nameInput.value = '';
    if (descInput) descInput.value = '';
    if (ratingInput) ratingInput.value = '';
    
    // Reset stars
    const stars = document.querySelectorAll('.modal-star');
    stars.forEach(star => {
        star.style.color = '#D2B48C';
    });
}
