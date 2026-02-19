particlesJS("stars", {	
  "particles": {
    "number": { "value": 200, "density": { "enable": true, "value_area": 1000 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.8,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
    },
    "size": { "value": 2, "random": true },
    "line_linked": { "enable": false },
    "move": { "enable": true, "speed": 0.2, "random": true, "straight": false, "out_mode": "out" }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": { "enable": true, "mode": "repulse" },
      "onclick": { "enable": false }
    },
    "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
  },
  "retina_detect": true
});

let targetX = 0, targetY = 0;
let currentX = 0, currentY = 0;

window.addEventListener('mousemove', e => {
  targetX = (e.clientX / window.innerWidth - 0.5) * 100;
  targetY = (e.clientY / window.innerHeight - 0.5) * 100;
});

function animateParallax() {
  const dx = targetX - currentX;
  const dy = targetY - currentY;

  currentX += dx * 0.05;
  currentY += dy * 0.05;

  document.getElementById('stars').style.transform = `translate(${currentX}px, ${currentY}px)`;

  requestAnimationFrame(animateParallax);
}

animateParallax();

function updateStarVisibility(lightness) {
  const stars = document.getElementById('stars');
  stars.style.opacity = lightness < 40 ? 1 : 0;
}
