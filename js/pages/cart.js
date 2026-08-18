const CART_STORE = 'cartItems';
const cartBlock = document.querySelector('.cart-blocks');

function getCartItems() {
    return JSON.parse(localStorage.getItem(CART_STORE)) || [];
}

function saveCartItems(cartItems) {
    localStorage.setItem(CART_STORE, JSON.stringify(cartItems));
}


function updateOrderSummary(cartItems) {
    const subtotal = cartItems.reduce((total, cartItem) => {
        const product = productData.find(product => product.id === cartItem.id);

        return total + (
            product
                ? (product.originalPrice || product.price) * cartItem.quantity
                : 0
        );
    }, 0);

    const discount = cartItems.reduce((total, cartItem) => {
        const product = productData.find(product => product.id === cartItem.id);

        return total + (
            product?.originalPrice
                ? (product.originalPrice - product.price) * cartItem.quantity
                : 0
        );
    }, 0);

    const deliveryFee = cartItems.length ? 15 : 0;
    const total = subtotal - discount + deliveryFee;

    document.querySelector('.order-sequence__value--subtotal').textContent = `$${subtotal}`;
    document.querySelector('.order-sequence__value--discount').textContent = `-$${discount}`;
    document.querySelector('.order-sequence__value--delivery').textContent = `$${deliveryFee}`;
    document.querySelector('.order-total__value').textContent = `$${total}`;

}

function renderCart() {
    const cartItems = getCartItems().filter(cartItem =>
        productData.some(product => product.id === cartItem.id)
    );

    saveCartItems(cartItems);
    updateOrderSummary(cartItems);

    if (!cartItems.length) {
        cartBlock.innerHTML = '<p>Your cart is empty.</p>';
        return 0;
    }

    cartBlock.innerHTML = cartItems.map(cartItem => {
        const product = productData.find(product => product.id === cartItem.id);

        return `
            <section class="cart-block">
                <img src="${product.image}" alt="${product.name}" width="120" height="120">
                <section class="cart-block__content">
                    <div class="cart-block__first">
                        <h3 class="first-head">${product.name}</h3>
                        <img class="delete-icon" data-action="delete" data-id="${product.id}" src="./assets/icons/delete.svg" alt="Remove ${product.name}">
                    </div>
                    <div class="cart-block__second">
                        <h5>Size: <span>Large</span></h5>
                        <h5>Color: <span>White</span></h5>
                    </div>
                    <div class="cart-block__third">
                        <h3>$${product.price}</h3>
                        <div class="product-count">
                            <img class="icon" data-action="decrease" data-id="${product.id}" src="./assets/icons/subtract.svg" alt="Decrease quantity">
                            <h4 class="count__variable">${cartItem.quantity}</h4>
                            <img class="icon" data-action="increase" data-id="${product.id}" src="./assets/icons/add.svg" alt="Increase quantity">
                        </div>
                    </div>
                </section>
            </section>
        `;
    }).join('');
}

cartBlock.addEventListener('click', event => {
    const target = event.target.dataset;
    const id = Number(target.id);
    const action = target.action;

    if (!id) return;

    const cartItems = getCartItems();
    const cartItem = cartItems.find(item => item.id === id);

    if (action === 'delete') {
        saveCartItems(cartItems.filter(item => item.id !== id));
    } else if (action === 'increase') {
        cartItem.quantity++;
        saveCartItems(cartItems);
    } else if (action === 'decrease') {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            saveCartItems(cartItems);
        } else {
            saveCartItems(cartItems.filter(item => item.id !== id));
        }
    } else {
        return;
    }

    renderCart();
});

renderCart()