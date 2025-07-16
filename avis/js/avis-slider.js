const images = [
  'img/1.jpg',
  'img/2.jpg',
  'img/3.jpg',
  'img/4.jpg',
  'img/5.jpg',
  'img/6.jpg',
  'img/7.jpg',
];

let idx = 0;
const viewer = document.querySelector('#viewer img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function updateViewer() {
  viewer.src = images[idx];
}

prevBtn.addEventListener('click', () => {
  idx = (idx - 1 + images.length) % images.length;
  updateViewer();
});

nextBtn.addEventListener('click', () => {
  idx = (idx + 1) % images.length;
  updateViewer();
});

// Affichage initial
updateViewer();
