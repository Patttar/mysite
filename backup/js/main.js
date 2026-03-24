// ===== Scroll Animation Observer =====
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for fade-in animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe case cards and UI shots
  document.querySelectorAll('.case-card, .ui-shots__item').forEach(el => {
    observer.observe(el);
  });

  // Smooth hover parallax on case card mockups
  document.querySelectorAll('.case-card__mockup').forEach(mockup => {
    mockup.addEventListener('mousemove', (e) => {
      const rect = mockup.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      const img = mockup.querySelector('img');
      if (img) {
        img.style.transform = `scale(1.02) translate(${x * -8}px, ${y * -8}px)`;
      }
    });

    mockup.addEventListener('mouseleave', () => {
      const img = mockup.querySelector('img');
      if (img) {
        img.style.transform = 'scale(1) translate(0, 0)';
        img.style.transition = 'transform 0.4s ease';
      }
    });
  });
});
