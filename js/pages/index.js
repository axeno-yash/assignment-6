const productContainer = document.querySelector('#new-arrivals-container');

function TotalStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return `
        ${'<img src="./assets/icons/star.svg" alt="">'.repeat(fullStars)}
        ${hasHalfStar ? '<img src="./assets/icons/star-half.svg" alt="">' : ''}
    `;
}

productContainer.innerHTML = productData.map(product => `
            <a class="product-card" href="./product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="product-card__image">
                        <h4 class="new-arrivals__product-name">${product.name}</h4>
                        <div class="new-arrivals__rating">
                            ${TotalStars(product.rating)}
                            <h5 class="rating-h2">${product.rating}/<span class="rating-span">5</span></h5>
                        </div>
                        <div class="new-arrivals__pricing">
                            <h3 class="new-arrivals__price">$${product.price}</h3>
                            ${product.originalPrice ? `<h3 class="new-arrivals__discount">$${product.originalPrice}</h3>` : ''}
                            ${product.discount ? `<h4 class="new-arrivals__percent">-${product.discount}%</h4>` : ''}
                        </div>
                    </a>
                `).join('');

const topSellingContainer = document.querySelector('#top-selling-container');
topSellingContainer.innerHTML = productData.map(product => `
                    <a class="topselling-card" href="./product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="topselling-card__image">
                        <h4 class="top-selling__product-name">${product.name}</h4>
                        <div class="top-selling__rating">
                            ${TotalStars(product.rating)}
                            <h5 class="rating-h2">${product.rating}/<span class="rating-span">5</span></h5>
                        </div>
                        <div class="top-selling__pricing">
                            <h3 class="top-selling__price">$${product.price}</h3>
                            ${product.originalPrice ? `<h3 class="top-selling__discount">$${product.originalPrice}</h3>` : ''}
                            ${product.discount ? `<h4 class="top-selling__percent">-${product.discount}%</h4>` : ''}
                        </div>
                    </a>
                `).join('');
