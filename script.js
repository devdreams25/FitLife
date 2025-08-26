const track = document.querySelector('.carousel-track');
const cards = Array.from(track.children);
const dots = document.querySelectorAll('.dot');

let currentIndex = 0;

// 🚫 Disable functionality on mobile
function isMobile() {
  return window.innerWidth <= 768;
}

function updateCarousel(index) {
  if (isMobile()) return; // Do nothing on mobile

  // Remove old active
  cards[currentIndex].classList.remove('active');
  dots[currentIndex].classList.remove('active');

  // Update new active
  currentIndex = index;
  cards[currentIndex].classList.add('active');
  dots[currentIndex].classList.add('active');

  // Desktop offset
  const containerWidth = track.parentElement.offsetWidth;
  const cardWidth = cards[0].getBoundingClientRect().width;
  let offset = -cardWidth * currentIndex + (containerWidth - cardWidth) / 2;

  track.style.transform = `translateX(${offset}px)`;
}

// Add listeners only if not mobile
if (!isMobile()) {
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateCarousel(index));
  });

  cards.forEach((card, index) => {
    card.addEventListener('click', () => updateCarousel(index));
  });

  window.addEventListener('resize', () => {
    if (!isMobile()) {
      updateCarousel(currentIndex);
    }
  });

  updateCarousel(0);
}
