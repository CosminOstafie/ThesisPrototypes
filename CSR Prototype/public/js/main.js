fetch('http://localhost:3001/api/products')
.then(res => res.json())
.then( products => {
    const container = document.getElementById('product-list');
    products.forEach(product => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        col.innerHTML = `
        <div class="card h-100">  
        <div class="card-body d-flex flex-column">
            <h5 class="card-title">${product.name}</h5>
            <p class="text-muted">${product.brand}</p>
            <p><strong>$${product.price_usd}</strong></p>
            <p class="small">${product.description}</p>
            <a href="product.html?id=${product.id}" class="btn btn-primary mt-auto align-self-center">View Details</a>
          </div>
        </div>
      `;
      container.appendChild(col);
    });
});