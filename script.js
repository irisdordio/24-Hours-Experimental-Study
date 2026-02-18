const gradientBg = document.getElementById("gradient-bg");
const contents = document.querySelectorAll(".content");

const gradients = [
  [[248,231,225],[230,213,247],[191,216,255]],
  [[221,243,255],[255,255,255],[190,227,255]],
  [[255,214,165],[255,173,96],[255,123,84]],
  [[46,31,71],[164,80,139],[255,122,122]],
  [[11,19,43],[28,37,65],[58,80,107]]
];

function lerp(a,b,t){ return a + (b-a)*t; }

function interpolateColor(c1,c2,t){
  return c1.map((v,i)=>Math.round(lerp(v,c2[i],t)));
}

function rgbString(rgb){
  return `rgb(${rgb[0]},${rgb[1]},${rgb[2]})`;
}

function rgbToHsl(r, g, b){
  r /= 255; g /= 255; b /= 255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h, s, l = (max + min) / 2;

  if(max === min){
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch(max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}

function update(){

  const scrollY = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  let progress = maxScroll === 0 ? 0 : scrollY / maxScroll;
  progress = Math.min(Math.max(progress,0),1);

  const total = gradients.length - 1;
  const scaled = progress * total;
  const index = Math.floor(scaled);
  const t = scaled - index;

  if(gradients[index+1]){
    const g1 = gradients[index];
    const g2 = gradients[index+1];

    const c1 = interpolateColor(g1[0],g2[0],t);
    const c2 = interpolateColor(g1[1],g2[1],t);
    const c3 = interpolateColor(g1[2],g2[2],t);

    gradientBg.style.background =
      `linear-gradient(180deg, ${rgbString(c1)}, ${rgbString(c2)}, ${rgbString(c3)})`;

    const avg = [
      Math.round((c1[0]+c2[0]+c3[0])/3),
      Math.round((c1[1]+c2[1]+c3[1])/3),
      Math.round((c1[2]+c2[2]+c3[2])/3)
    ];

    const [h, s, l] = rgbToHsl(avg[0], avg[1], avg[2]);

    const shiftedHue = (h + 25) % 360;
    const textLightness = lerp(90, 20, l / 100);
    const textColor = `hsl(${shiftedHue}, ${Math.min(s,60)}%, ${textLightness}%)`;

    contents.forEach(content=>{
      content.querySelector("h1").style.color = textColor;
      content.querySelector("p").style.color = textColor;
    });

    if(typeof updateStarVisibility === "function"){
      updateStarVisibility(l);
    }
  }

  contents.forEach(content=>{
    const rect = content.getBoundingClientRect();
    if(rect.top < window.innerHeight * 0.8){
      content.classList.add("visible");
    }
  });

  requestAnimationFrame(update);
}

update();
