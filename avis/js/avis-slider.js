const images = [];
let index = 0;

for (let i = 1; i <= 20; i++) {
  images.push(`img/${i}.jpg`);
}

const imgElement = document.getElementById('sliderImage');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateImage() {
  imgElement.src = images[index];
}

prevBtn.addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  updateImage();
});

nextBtn.addEventListener('click', () => {
  index = (index + 1) % images.length;
  updateImage();
});
