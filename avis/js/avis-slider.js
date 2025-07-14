const images = ['img/1.jpg','img/2.jpg','img/3.jpg'];
let idx = 0;

const slider = document.getElementById('sliderImage');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');

function update() {
  slider.src = images[idx];
}
prev.addEventListener('click', ()=> {
  idx = (idx - 1 + images.length) % images.length; update();
});
next.addEventListener('click', ()=> {
  idx = (idx + 1) % images.length; update();
});
