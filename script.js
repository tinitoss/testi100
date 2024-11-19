// Toggle mobile menu (burger icon)
function toggleMenu() {
  const navbar = document.querySelector('header');
  navbar.classList.toggle('active'); // Toggle the 'active' class to show or hide the menu
  document.body.style.overflow = navbar.classList.contains('active') ? 'hidden' : 'auto'; // Prevent scrolling when menu is open
}

// Smooth scroll to sections when clicking links in navbar
document.querySelectorAll('header nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent the default link click behavior

    const targetId = this.getAttribute('href').substring(1); // Get the section ID from href
    const targetElement = document.getElementById(targetId); // Find the target section element by ID

    // Scroll to the target section, with a small offset for the fixed header
    window.scrollTo({
      top: targetElement.offsetTop - 60, // 60px offset to avoid the fixed navbar covering content
      behavior: 'smooth'
    });

    // Close the mobile menu after clicking a link (for mobile users)
    const navbar = document.querySelector('header');
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling when menu is closed
  });
});

// Back to top button functionality
const backToTopButton = document.querySelector('.back-to-top');

// Show or hide the back-to-top button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block'; // Show button if scrolled more than 300px
  } else {
    backToTopButton.style.display = 'none'; // Hide button if scrolled back to top
  }
});

// Smooth scroll to the top when clicking the back-to-top button
backToTopButton.addEventListener('click', () => {
  window.scrollTo({
    top: 0, // Scroll to the top of the page
    behavior: 'smooth'
  });
});

// Fade-in animation for elements with the 'fade-in' class as they come into view
window.addEventListener('scroll', () => {
  const fadeElements = document.querySelectorAll('.fade-in');

  fadeElements.forEach(el => {
    const elementTop = el.getBoundingClientRect().top; // Get position of the element relative to the viewport
    const windowHeight = window.innerHeight; // Get the height of the viewport

    // If the element is within 80% of the viewport height, add 'visible' class to trigger fade-in
    if (elementTop < windowHeight * 0.8) {
      el.classList.add('visible');
    }
  });
});

// Menu toggle (for mobile): Ensure the menu is closed when clicked outside
document.addEventListener('click', (e) => {
  const navbar = document.querySelector('header');
  const burgerMenu = document.querySelector('.burger-menu');
  const navLinks = document.querySelector('header nav ul');

  // If the user clicks outside the navbar or burger menu, close the menu
  if (!navbar.contains(e.target) && !burgerMenu.contains(e.target) && !navLinks.contains(e.target)) {
    navbar.classList.remove('active');
    document.body.style.overflow = 'auto'; // Re-enable scrolling when menu is closed
  }
});

// Slider functionality: Repeating (looping) automatic slider
let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;
const sliderContainer = document.querySelector('.slider');

// Krijo një kopje të fotove dhe shto ato në fund për të krijuar efektin e loop-it
for (let i = 0; i < totalSlides; i++) {
  const clone = slides[i].cloneNode(true); // Krijon kopje të çdo slidi
  sliderContainer.appendChild(clone); // Shton kopjet në fund të slider-it
}

function showSlide(i) {
  if (i >= totalSlides) {
    currentIndex = 0;
  } else if (i < 0) {
    currentIndex = totalSlides - 1;
  } else {
    currentIndex = i;
  }

  // Lëviz sliderin për të shfaqur sliden e duhur
  sliderContainer.style.transition = "transform 1s ease-in-out"; // Shtoni animacion për kalimin e fotove
  sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Funksioni për të kaluar te slide-i tjetër
function nextSlide() {
  currentIndex++;
  if (currentIndex === totalSlides) { // Kur arrin fundin e fotove, kthehet në të parën
    currentIndex = 0;
    sliderContainer.style.transition = "none"; // Heq animacionin për kalimin që të mos ketë ndjesi të ngadaltë
    sliderContainer.style.transform = `translateX(0%)`; // Ktheje në fillim për të krijuar një loop të padukshëm
    setTimeout(() => {
      sliderContainer.style.transition = "transform 1s ease-in-out"; // Rishkruaj animacionin pas kalimit
      showSlide(currentIndex); // Trego sliden e parë me animacion
    }, 50); // Daj një vonesë të vogël që të bëhet i padukshëm
  } else {
    showSlide(currentIndex);
  }
}

// Funksioni për të kaluar te slide-i i mëparshëm
function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) { // Kur shkon para sliden e parë, kthehet në të fundit
    currentIndex = totalSlides - 1;
    sliderContainer.style.transition = "none"; // Heq animacionin për kalimin që të mos ketë ndjesi të ngadaltë
    sliderContainer.style.transform = `translateX(-${currentIndex * 100}%)`; // Shfaqe në fund të fotove
    setTimeout(() => {
      sliderContainer.style.transition = "transform 1s ease-in-out"; // Kthe animacionin pas kalimit
      showSlide(currentIndex); // Trego sliden e fundit me animacion
    }, 50); // Daj një vonesë të vogël që të bëhet i padukshëm
  } else {
    showSlide(currentIndex);
  }
}

// Intervali për kalimin automatik te fotot çdo 3 sekonda
let slideInterval = setInterval(nextSlide, 3000); // 3000 ms = 3 sekonda

// Aktivizo fillimin e slider-it me foton e parë
showSlide(currentIndex);

// Aktivizimi i ndalimit të slider-it kur maus-i është mbi fotot
slides.forEach(slide => {
  slide.addEventListener('mouseover', () => {
    clearInterval(slideInterval); // Ndalon slider-in kur maus-i është mbi foto
  });

  slide.addEventListener('mouseout', () => {
    slideInterval = setInterval(nextSlide, 3000); // Rifillon slider-in kur maus-i largohet
  });
});

// Add event listeners for the next and previous buttons
document.querySelector('.next-btn').addEventListener('click', nextSlide);
document.querySelector('.prev-btn').addEventListener('click', prevSlide);

// Ensure slider stops when the page is loaded
document.addEventListener('DOMContentLoaded', () => {
  clearInterval(slideInterval); // Stop any ongoing interval before initializing the slider
  slideInterval = setInterval(nextSlide, 3000); // Restart the interval
});
