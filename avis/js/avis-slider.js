const images = [
  "img/avis1.jpg",
  "img/avis2.jpg",
  "img/avis3.jpg"
];

let index = 0;
const imgElement = document.getElementById("photoAvis");

function changerImage(direction) {
  index = (index + direction + images.length) % images.length;
  imgElement.src = images[index];
}
