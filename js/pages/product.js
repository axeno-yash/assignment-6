const addToCart = document.querySelector(".product-cart");
const CART_STORE = 'cartItems';

const recommendationContainer = document.querySelector('#recommendation-container');
const productId = Number(new URLSearchParams(window.location.search).get('id'));
const selectedProduct = productData.find(product => product.id === productId) || productData[0];

function renderStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return `
        ${'<img src="./assets/icons/star.svg" alt="">'.repeat(fullStars)}
        ${hasHalfStar ? '<img src="./assets/icons/star-half.svg" alt="">' : ''}
    `;
}

function showProductDetails(product) {
    document.querySelector('.product__content-title').textContent = product.name;
    document.querySelector('.product__price').textContent = `$${product.price}`;

    const originalPrice = document.querySelector('.product__discount');
    originalPrice.textContent = product.originalPrice ? `$${product.originalPrice}` : '';
    originalPrice.hidden = !product.originalPrice;

    const discount = document.querySelector('.product__percent');
    discount.textContent = product.discount ? `-${product.discount}%` : '';
    discount.hidden = !product.discount;

    document.querySelector('.product__content-stars').innerHTML = renderStars(product.rating);
    document.querySelector('.product__content-rating .rating-h2').innerHTML =
        `${product.rating}/<span class="rating-span">5</span>`;

    document.querySelectorAll('.product__main-img, .tshirt-view').forEach(image => {
        image.src = product.image;
        image.alt = product.name;
    });
}

showProductDetails(selectedProduct);

const product = {
    id: selectedProduct.id,
    name: selectedProduct.name,
    price: selectedProduct.price,
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

addToCart.addEventListener('click', () => {
    const cartItems = JSON.parse(localStorage.getItem(CART_STORE)) || [];
    const existingItem = cartItems.find(item => item.id === selectedProduct.id);    

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cartItems.push({ id: selectedProduct.id, name: selectedProduct.name, quantity });
    }

    localStorage.setItem(CART_STORE, JSON.stringify(cartItems));
    alert(`${selectedProduct.name} added to your cart.`);
    window.location.href = "cart.html";
});

recommendationContainer.innerHTML = productData.map(product => `
                    <a class="recommendation-card" href="./product.html?id=${product.id}">
                        <img src="${product.image}" alt="${product.name}" class="recommendation-card__image">
                        <h4 class="recommendation__product-name">${product.name}</h4>
                        <div class="recommendation__rating">
                            ${renderStars(product.rating)}
                            <h5 class="rating-h2">${product.rating}/<span class="rating-span">5</span></h5>
                        </div>
                        <div class="recommendation__pricing">
                            <h3 class="recommendation__price">$${product.price}</h3>
                            ${product.originalPrice ? `<h3 class="recommendation__discount">$${product.originalPrice}</h3>` : ''}
                            ${product.discount ? `<h4 class="recommendation__percent">-${product.discount}%</h4>` : ''}
                        </div>
                    </a>
                `).join('');
                