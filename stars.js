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

window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const stars = document.getElementById('stars');
  stars.style.transform = `translate(${x}px, ${y}px)`;
});

function updateStarVisibility(lightness) {
  const stars = document.getElementById('stars');
  stars.style.opacity = lightness < 40 ? 1 : 0;
}
