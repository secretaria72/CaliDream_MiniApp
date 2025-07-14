const imageFolder = 'img/';
let currentIndex = 1;
const totalImages = 20; // tu peux augmenter ce nombre selon les fichiers présents

const sliderImage = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateImage() {
  sliderImage.src = ${imageFolder}${currentIndex}.jpg;
}

prevBtn.addEventListener('click', () => {
  currentIndex = currentIndex <= 1 ? totalImages : currentIndex - 1;
  updateImage();
});

nextBtn.addEventListener('click', () => {
  currentIndex = currentIndex >= totalImages ? 1 : currentIndex + 1;
  updateImage();
});
