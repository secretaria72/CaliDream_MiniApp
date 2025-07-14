const imageElement = document.getElementById("slider-img");
let currentIndex = 0;
let images = [];

// Charger toutes les images depuis avis/img/
for (let i = 1; i <= 20; i++) {
  const img = new Image();
  img.src = img/avis${i}.jpg;
  img.onload = () => {
    images.push(img.src);
    if (images.length === 1) {
      imageElement.src = img.src;
    }
  };
}

// Navigation
function showImage(index) {
  if (images.length > 0) {
    currentIndex = (index + images.length) % images.length;
    imageElement.src = images[currentIndex];
  }
}

function nextImage() {
  showImage(currentIndex + 1);
}

function prevImage() {
  showImage(currentIndex - 1);
}
