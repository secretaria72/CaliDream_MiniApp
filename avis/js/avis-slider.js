const imageList = [];
let currentImage = 0;

// Charge automatiquement les images numérotées dans avis/img/
for (let i = 1; i <= 20; i++) {
  imageList.push(`img/${i}.jpg`);
}

const imageEl = document.getElementById("sliderImage");

function changeImage(direction) {
  currentImage = (currentImage + direction + imageList.length) % imageList.length;
  imageEl.src = imageList[currentImage];
}
