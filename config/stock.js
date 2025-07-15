fetch('../meta.json')
  .then(res => res.json())
  .then(data => {
    const path = window.location.pathname;
    const file = path.substring(path.lastIndexOf('/') + 1);

    const product = data.products.find(p => p.filename === file);
    const stockDiv = document.getElementById('stock-status');

    if (product && stockDiv) {
      if (product.in_stock) {
        stockDiv.textContent = '🟢 En stock';
        stockDiv.classList.add(true);
      } else {
        stockDiv.textContent = '🔴 Bientôt';
        stockDiv.classList.add(false);
      }
    }
  });
