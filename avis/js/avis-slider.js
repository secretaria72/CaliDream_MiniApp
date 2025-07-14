const slider = document.getElementById("sliderImage");
const folder = "img/";
let index = 1;
let max = 1;

// Détecte combien d'images il y a dans le dossier (jusqu'à 99 max)
for (let i = 1; i <= 99; i++) {
  const img = new Image();
  img.src = ${folder}${i}.jpg;
  img.onload = () => {
    if (i > max) max = i;
  };
  img.onerror = () => {};
}

function updateImage() {
  slider.src = ${folder}${index}.jpg;
}

document.getElementById("prevBtn").onclick = () => {
  index = index <= 1 ? max : index - 1;
  updateImage();
};

document.getElementById("nextBtn").onclick = () => {
  index = index >= max ? 1 : index + 1;
  updateImage();
};
