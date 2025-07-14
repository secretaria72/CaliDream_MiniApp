const images = ['1.jpg','2.jpg','3.jpg']; // adapter avec ton dossier /avis/img/
let current = 0;
const slider = document.getElementById('sliderImage');
document.getElementById('prevBtn').onclick = () => {
  current = (current + images.length - 1) % images.length;
  slider.src = img/${images[current]};
};
document.getElementById('nextBtn').onclick = () => {
  current = (current + 1) % images.length;
  slider.src = img/${images[current]};
};
