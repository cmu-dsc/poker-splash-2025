// Use passive scroll listener for better performance
let lastScrollY = window.scrollY;
let rafId = null;

function handleScroll() {
  const wrappers = document.querySelectorAll('.card-wrapper');
  const viewportHeight = window.innerHeight;
  
  wrappers.forEach((wrapper, index) => {
    const section = wrapper.querySelector('section');
    const rect = wrapper.getBoundingClientRect();
    
    // Only update if element is in viewport or near it
    if (Math.abs(rect.top) < viewportHeight * 1.5) {
      // Set z-index based on scroll position
      section.style.zIndex = wrappers.length - index;
      
      if (rect.top <= 0) {
        const progress = Math.abs(rect.top) / (viewportHeight * 0.7);
        // Use transform3d for better performance
        section.style.transform = `translate3d(0, ${-progress * 100}%, 0)`;
      } else {
        section.style.transform = 'translate3d(0, 0, 0)';
      }
    }
  });
}

// Optimized scroll listener with requestAnimationFrame
window.addEventListener('scroll', () => {
  if (rafId) return;
  
  rafId = requestAnimationFrame(() => {
    handleScroll();
    rafId = null;
  });
}, { passive: true });

// Initial call
handleScroll();
