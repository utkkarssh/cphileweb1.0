document.addEventListener("DOMContentLoaded", () => {
  const carouselContainer = document.querySelector(".carousel-container");
  const slides = document.querySelectorAll(".carousel-slide");
  const prevButton = document.querySelector(".carousel-prev");
  const nextButton = document.querySelector(".carousel-next");

  if (carouselContainer && slides.length > 0) {
    let currentIndex = 0;
    const slideInterval = 2500; // Time in milliseconds between slides
    let autoplay;

    function updateCarousel() {
      const slideWidth = slides[0].clientWidth;
      carouselContainer.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
      console.log(`Carousel updated: currentIndex = ${currentIndex}`);
    }

    function startAutoplay() {
      autoplay = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
      }, slideInterval);
    }

    function stopAutoplay() {
      clearInterval(autoplay);
    }

    // Event listeners for manual controls
    if (prevButton && nextButton) {
      prevButton.addEventListener("click", () => {
        stopAutoplay();
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
        updateCarousel();
        startAutoplay();
      });

      nextButton.addEventListener("click", () => {
        stopAutoplay();
        currentIndex = (currentIndex + 1) % slides.length;
        updateCarousel();
        startAutoplay();
      });
    }

    // Handle click on left and right sides of the carousel
    carouselContainer.addEventListener("click", (event) => {
      const containerWidth = carouselContainer.clientWidth;
      const clickX = event.clientX;

      stopAutoplay();

      if (clickX < containerWidth / 2) {
        // Clicked on the left side
        currentIndex = currentIndex > 0 ? currentIndex - 1 : slides.length - 1;
      } else {
        // Clicked on the right side
        currentIndex = (currentIndex + 1) % slides.length;
      }

      updateCarousel();
      startAutoplay();
    });

    // Pause autoplay on hover
    carouselContainer.addEventListener("mouseenter", stopAutoplay);
    carouselContainer.addEventListener("mouseleave", startAutoplay);

    // Initialize carousel
    updateCarousel();
    startAutoplay();

    // Adjust carousel on window resize
    window.addEventListener("resize", updateCarousel);
  } else {
    console.error("Carousel elements not found or improperly configured.");
  }
});
