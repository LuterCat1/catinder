document.addEventListener("DOMContentLoaded", function () {
    const catCard = document.getElementById("cat-card");
    const catImage = document.getElementById("cat-image");
    const nopeBtn = document.getElementById("nope-btn");
    const likeBtn = document.getElementById("like-btn");

    let catImages = [];
    let currentIndex = 0;

    // Fetch multiple cat images
    function fetchCatImages() {
        fetch('https://api.thecatapi.com/v1/images/search?limit=3')
            .then(response => response.json())
            .then(data => {
                catImages = data.map(cat => cat.url);
                catImage.src = catImages[currentIndex];
            })
            .catch(error => console.error('Error fetching cat images:', error));
    }

    // Load the next image
    function loadNextImage() {
        currentIndex++;
        if (currentIndex >= catImages.length) {
            fetchCatImages(); // Fetch new images when out of preloaded images
            currentIndex = 0;
        } else {
            catImage.style.opacity = '0';  // Hide the image before updating it
            setTimeout(() => {
                catImage.src = catImages[currentIndex];
                catImage.onload = () => catImage.style.opacity = '1'; // Show the image once it's loaded
            }, 300);  // Short delay to ensure smooth transition
        }
    }

    // Event listeners for buttons
    nopeBtn.addEventListener('click', () => {
        catCard.classList.add('swipe-left');
        setTimeout(() => {
            catCard.classList.remove('swipe-left');
            loadNextImage();
        }, 500);
    });

    likeBtn.addEventListener('click', () => {
        catCard.classList.add('swipe-right');
        setTimeout(() => {
            catCard.classList.remove('swipe-right');
            loadNextImage();
        }, 500);
    });

    // Initial fetch
    fetchCatImages();
});
