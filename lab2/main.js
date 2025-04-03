document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector(".slider");
    const slides = document.querySelectorAll(".slider-element");
    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoSlideInterval;
    let isPaused = false;


    slider.style.width = `${totalSlides * 100}%`;
    
    slides.forEach(slide => {
        slide.style.width = `${100 / totalSlides}%`;
    });


    function createDots() {
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement("div");
            dot.classList.add("dot");
            if (i === 0) dot.classList.add("active");
            dot.dataset.index = i;
            dotsContainer.appendChild(dot);

            dot.addEventListener("click", (e) => {
                currentIndex = parseInt(e.target.dataset.index);
                updateSlider();
                resetAutoSlide();
            });
        }
    }


    function updateSlider() {
        const translateValue = -(currentIndex * (100 / totalSlides));
        slider.style.transform = `translateX(${translateValue}%)`;

 
        const dots = document.querySelectorAll(".dot");
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add("active");
            } else {
                dot.classList.remove("active");
            }
        });
    }

 
    function nextSlide() {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }

 
    function prevSlide() {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlider();
    }


    nextBtn.addEventListener("click", () => {
        nextSlide();
        resetAutoSlide();
    });

    prevBtn.addEventListener("click", () => {
        prevSlide();
        resetAutoSlide();
    });


    slider.addEventListener("mouseenter", () => {
        clearInterval(autoSlideInterval);
    });
    
    slider.addEventListener("mouseleave", () => {
        if (!isPaused) {
            startAutoSlide();
        }
    });

    slides.forEach(slide => {
        slide.addEventListener("click", () => {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(autoSlideInterval);
                slide.classList.add("paused");
            } else {
                slide.classList.remove("paused");
                startAutoSlide();
            }
        });
    });

    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        if (!isPaused) {
            autoSlideInterval = setInterval(() => {
                nextSlide();
            }, 3000);
        }
    }

    function resetAutoSlide() {
        isPaused = false;
        slides.forEach(slide => slide.classList.remove("paused"));
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }


    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextSlide();
            resetAutoSlide();
        } else if (e.key === 'ArrowLeft') {
            prevSlide();
            resetAutoSlide();
        } else if (e.key === ' ') {
            isPaused = !isPaused;
            if (isPaused) {
                clearInterval(autoSlideInterval);
            } else {
                startAutoSlide();
            }
            e.preventDefault(); 
        }
    });


    createDots();
    updateSlider();
    startAutoSlide();
});