const images = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg'
];
let idx = 0;
const imgElem = document.getElementById('sliderImage');
document.getElementById('prevBtn').onclick = () => {
  idx = (idx - 1 + images.length) % images.length;
  imgElem.src = images[idx];
};
document.getElementById('nextBtn').onclick = () => {
  idx = (idx + 1) % images.length;
  imgElem.src = images[idx];
};
