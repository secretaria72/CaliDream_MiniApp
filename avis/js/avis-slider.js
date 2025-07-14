const imageList = [];
let currentImage = 0;

// Auto-chargement de toutes les images dans /avis/img/ nommées 1.jpg, 2.jpg, etc.
for (let i = 1; i <= 20; i++) {
  imageList.push(`img/${i}.jpg`);
}

const imageEl = document.getElementById("sliderImage");

function changeImage(direction) {
  currentImage = (currentImage + direction + imageList.length) % imageList.length;
  imageEl.src = imageList[currentImage];
}
