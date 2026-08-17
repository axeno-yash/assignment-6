const addToCart = document.querySelector(".product-cart");
const productItems = document.querySelectorAll(".productItem");

    addToCart.addEventListener("click", () => {
        const name = document.querySelector(".product__content-title").textContent.trim();
        const price = document.querySelector(".product__price").textContent.trim();
        const description = document.querySelector(".product__para").textContent.trim();
        const quantity = document.querySelector(".count__variable").textContent.trim();
        const items = [name, price, description, quantity];

        localStorage.setItem("productItem", JSON.stringify(items))
    });



const RecommendationContainer = document.querySelector('#recommendation-container');

const product = {
    id: Number(new URLSearchParams(window.location.search).get('id')) || 1,
    name: document.querySelector('.product__content-title').textContent,
    price: document.querySelector('.product__price').textContent,
    quantity: 1
};

let quantity = product.quantity;
const quantityValue = document.querySelector('#quantityValue');

quantityValue.textContent = quantity;

function saveProductQuantity() {
    product.quantity = quantity;
}

document.querySelector('#plusBtn').addEventListener('click', () => {
    quantity++;
    quantityValue.textContent = quantity;
    saveProductQuantity();
});

document.querySelector('#minusBtn').addEventListener('click', () => {
    if (quantity > 1) {
        quantity--;
        quantityValue.textContent = quantity;
        saveProductQuantity();
    }
});

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
