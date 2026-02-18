particlesJS("stars", {
  "particles": {
    "number": { "value": 150, "density": { "enable": true, "value_area": 800 } },
    "color": { "value": "#ffffff" },
    "shape": { "type": "circle" },
    "opacity": {
      "value": 0.8,
      "random": true,
      "anim": { "enable": true, "speed": 1, "opacity_min": 0.3, "sync": false }
    },
    "size": { "value": 2, "random": true },
    "line_linked": { "enable": false },
    "move": { "enable": true, "speed": 0.3, "random": true, "straight": false, "out_mode": "out", "bounce": false }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": { "onhover": { "enable": true, "mode": "repulse" }, "onclick": { "enable": false } },
    "modes": { "repulse": { "distance": 100, "duration": 0.4 } }
  },
  "retina_detect": true
});

const stars = document.getElementById('stars');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  stars.style.transform = `translateY(${scrollY * 0.08}px)`;
});

function updateStarVisibility(lightness){
  stars.style.opacity = lightness < 40 ? 1 : 0;
}
