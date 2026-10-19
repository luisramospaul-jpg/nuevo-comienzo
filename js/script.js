document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navCollapse = document.querySelector('.navbar-collapse');
        if (navCollapse && navCollapse.classList.contains('show')) {
          bootstrap.Collapse.getInstance(navCollapse).hide();
        }
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // 2. Año en el footer
  const yearSpan = document.getElementById('year');
  if (yearSpan) { yearSpan.textContent = new Date().getFullYear(); }

  // 3. Animación de revelado al hacer scroll (Scroll Reveal)
  const reveals = document.querySelectorAll('.glass-card, .section-title, .img-container');
  reveals.forEach(el => el.classList.add('reveal'));

  function reveal() {
    var windowHeight = window.innerHeight;
    var elementVisible = 100;
    reveals.forEach(el => {
      var elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", reveal);
  reveal(); // Ejecutar al cargar la página
});