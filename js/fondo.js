window.addEventListener('load', () => {
  const canvas = document.getElementById('bgCanvas');
  const toggleBtn = document.getElementById('toggleMode');
  if (!canvas || !toggleBtn) return;
  const ctx = canvas.getContext('2d');
  const modeIcon = document.getElementById('modeIcon');
  const modeText = document.getElementById('modeText');
  let width, height, particles = [], isNightMode = false;
  function resize() { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; }
  window.addEventListener('resize', resize); resize();
  const CONFIG = {
    day: { count: 90, speed: 0.8, color: 'rgba(224, 185, 60, 0.9)', lineColor: 'rgba(224, 185, 60, ', distance: 180, lineWidth: 2 },
    night: { count: 150, speed: 0.2, distance: 0 }
  };
  class Particle {
    constructor() {
      this.x = Math.random() * width; this.y = Math.random() * height;
      if (isNightMode) { this.vx = (Math.random() - 0.5) * CONFIG.night.speed; this.vy = (Math.random() - 0.5) * CONFIG.night.speed; this.radius = Math.random() * 1.5 + 0.5; this.twinkle = Math.random() * Math.PI * 2; }
      else { this.vx = (Math.random() - 0.5) * CONFIG.day.speed; this.vy = (Math.random() - 0.5) * CONFIG.day.speed; this.radius = Math.random() * 3 + 1.5; }
    }
    update() { this.x += this.vx; this.y += this.vy; if (this.x < 0 || this.x > width) this.vx *= -1; if (this.y < 0 || this.y > height) this.vy *= -1; if (isNightMode) this.twinkle += 0.05; }
    draw() { ctx.beginPath(); ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2); if (isNightMode) { const opacity = Math.abs(Math.sin(this.twinkle)) * 0.8 + 0.2; ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`; } else { ctx.fillStyle = CONFIG.day.color; } ctx.fill(); }
  }
  function initParticles() { particles = []; const count = isNightMode ? CONFIG.night.count : CONFIG.day.count; for (let i = 0; i < count; i++) particles.push(new Particle()); }
  function animate() {
    ctx.clearRect(0, 0, width, height);
    if (isNightMode) { ctx.fillStyle = 'rgba(10, 14, 23, 0.2)'; ctx.fillRect(0, 0, width, height); }
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(); particles[i].draw();
      if (!isNightMode) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x; const dy = particles[i].y - particles[j].y; const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < CONFIG.day.distance) { ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y); const opacity = 1 - (distance / CONFIG.day.distance); ctx.strokeStyle = CONFIG.day.lineColor + (opacity * 0.7) + ')'; ctx.lineWidth = CONFIG.day.lineWidth; ctx.stroke(); }
        }
      }
    }
    requestAnimationFrame(animate);
  }
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault(); isNightMode = !isNightMode;
    document.body.classList.toggle('modo-noche', isNightMode); document.body.classList.toggle('modo-dia', !isNightMode);
    if (modeIcon) modeIcon.className = isNightMode ? 'bi bi-brightness-high-fill' : 'bi bi-moon-stars-fill';
    if (modeText) modeText.textContent = isNightMode ? 'Modo Día' : 'Modo Noche';
    initParticles();
  });
  initParticles(); animate();
});