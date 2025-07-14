const images = [];
const folder = 'img/';
let idx = 0;

// Liste dynamique des fichiers (manuellement si pas possible)
images.push('1.jpg', '2.jpg', '3.jpg');

const slider = document.getElementById('sliderImage');
const prev = document.getElementById('prevBtn');
const next = document.getElementById('nextBtn');

function show(i){
  idx = (i + images.length) % images.length;
  slider.src = folder + images[idx];
}

prev.addEventListener('click', ()=> show(idx - 1));
next.addEventListener('click', ()=> show(idx + 1));

// tactile pour mobile
slider.parentElement.addEventListener('click', (e)=> {
  const w = slider.parentElement.clientWidth;
  show(e.offsetX < w/2 ? idx - 1 : idx + 1);
});

show(0);
