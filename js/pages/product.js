const RecommendationContainer = document.querySelector('#recommendation-container');
fetch('./products.json')
    .then(response => response.json())
    .then(products => {
        RecommendationContainer.innerHTML = products.map(product => `
                    <a class="recommendation-card" href="./product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="recommendation-card__image">
                        <h4 class="recommendation__product-name">${product.name}</h4>
                        <div class="recommendation__rating">
                            <div class="recommendation__stars">
                                <img src="./assets/icons/star.svg" alt="rating-star">
                                <img src="./assets/icons/star.svg" alt="rating-star">
                                <img src="./assets/icons/star.svg" alt="rating-star">
                                <img src="./assets/icons/star.svg" alt="rating-star">
                                <img src="./assets/icons/star.svg" alt="rating-star">
                            </div>
                            <h5 class="rating-h2">${product.rating}/<span class="rating-span">5</span></h5>
                        </div>
                        <div class="recommendation__pricing">
                            <h3 class="recommendation__price">$${product.price}</h3>
                            ${product.originalPrice ? `<h3 class="recommendation__discount">$${product.originalPrice}</h3>` : ''}
                            ${product.discount ? `<h4 class="recommendation__percent">-${product.discount}%</h4>` : ''}
                        </div>
                    </a>
                `).join('');
    })
    .catch(error => {
        console.error('Error loading products:', error);
    });