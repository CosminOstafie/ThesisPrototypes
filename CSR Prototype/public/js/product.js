const params = new URLSearchParams(window.location.search);

const productId = params.get('id');
console.log(productId);

fetch(`http://localhost:3001/api/products/${productId}`)
.then(res => res.json())
.then(product => {
    const container = document.getElementById('product-detail');

    if(!product || product.error){
        container.innerHTML = '<p> Product not found.</p>';
        return;
    }
    container.innerHTML = `
      <h2>${product.name}</h2>
      <p><strong>Brand:</strong> ${product.brand}</p>
      <p><strong>Category:</strong> ${product.category}</p>
      <p><strong>Price:</strong> $${product.price_usd}</p>
      <p>${product.description}</p>
      <a href="index.html" class="btn btn-secondary mt-3">&larr; Back to Products</a>
    `;
})