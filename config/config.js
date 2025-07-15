fetch('./meta.json')
  .then(response => response.json())
  .then(data => {
    const products = data.products;

    document.querySelectorAll('.product-card').forEach(card => {
      const link = card.getAttribute('onclick');
      const match = link.match(/fiche\/(.+?)\.html/);
      if (!match) return;

      const filename = match[1] + '.html';
      const product = products.find(p => p.filename === filename);
      if (!product) return;

      const badge = document.createElement('div');
      badge.classList.add('stock-badge');
      
      if (product.in_stock) {
        badge.classList.add('in');
        badge.textContent = 'En stock';
      } else {
        badge.classList.add('out');
        badge.textContent = 'Revient bientôt';
      }

      const img = card.querySelector('img');
      img.insertAdjacentElement('afterend', badge);
    });
  })
  .catch(error => {
    console.error('Erreur chargement stock:', error);
  });
