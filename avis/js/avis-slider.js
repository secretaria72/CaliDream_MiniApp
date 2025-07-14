const images = [];
let index = 0;

// Charger automatiquement les images depuis le dossier img/
for (let i = 1; i <= 20; i++) {
  const imgPath = img/${i}.jpg;
  images.push(imgPath);
}

const slider = document.getElementById("sliderImage");

function updateImage() {
  slider.src = images[index];
}

function changeImage(direction) {
  index = (index + direction + images.length) % images.length;
  updateImage();
}

document.getElementById("prevBtn").addEventListener("click", () => changeImage(-1));
document.getElementById("nextBtn").addEventListener("click", () => changeImage(1));
