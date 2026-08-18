const CART_STORE = 'cartItems';
const COUPON_STORE = 'cartCoupon';
const COUPONS = {
    SAVE10: 10,
    SAVE20: 20
};

const cartBlock = document.querySelector('.cart-blocks');
const orderInputField = document.querySelector('.promo-code__input');
const applyBtn = document.querySelector('.promo-code__button');
const couponMessage = document.querySelector('.promo-code__error');
const checkoutButton = document.querySelector('.checkout-button');

function getCartItems() {
    return JSON.parse(localStorage.getItem(CART_STORE)) || [];
}

function saveCartItems(cartItems) {
    if (cartItems.length) {
        localStorage.setItem(CART_STORE, JSON.stringify(cartItems));
    } else {
        localStorage.removeItem(CART_STORE);
        localStorage.removeItem(COUPON_STORE);
    }
}

function getCoupon() {
    const code = localStorage.getItem(COUPON_STORE);
    const couponDiscount = COUPONS[code];
    return couponDiscount ? { code, percentage: couponDiscount } : null;
}

function showCouponMessage(message, color) {
    couponMessage.textContent = message;
    couponMessage.style.color = color;
    couponMessage.hidden = false;
}

function updateOrderSummary(cartItems) {
    const subtotal = cartItems.reduce((total, cartItem) => {
        const product = productData.find(product => product.id === cartItem.id);
        return total + (product ? (product.originalPrice || product.price) * cartItem.quantity : 0);
    }, 0);
    const productDiscount = cartItems.reduce((total, cartItem) => {
        const product = productData.find(product => product.id === cartItem.id);
        return total + (product?.originalPrice ? (product.originalPrice - product.price) * cartItem.quantity : 0);
    }, 0);
    const coupon = getCoupon();
    const couponDiscount = coupon ? (subtotal - productDiscount) * (coupon.percentage / 100) : 0;
    const deliveryFee = cartItems.length ? 15 : 0;
    const total = subtotal - productDiscount - couponDiscount + deliveryFee;

    document.querySelector('.order-sequence__value--subtotal').textContent = `$${subtotal}`;
    document.querySelector('.order-sequence__value--discount').textContent = `-$${productDiscount + couponDiscount}`;
    document.querySelector('.order-sequence__value--delivery').textContent = `$${deliveryFee}`;
    document.querySelector('.order-total__value').textContent = `$${total}`;
    document.querySelector('.order-sequence__label--discount').textContent = coupon
        ? `Discount (${coupon.code})`
        : 'Discount';
}

function renderCart() {
    const cartItems = getCartItems().filter(cartItem =>
        productData.some(product => product.id === cartItem.id)
    );

    saveCartItems(cartItems);
    updateOrderSummary(cartItems);

    if (!cartItems.length) {
        cartBlock.innerHTML = '<p>Your cart is empty.</p>';
        return;
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
    const { id, action } = event.target.dataset;
    const productId = Number(id);

    if (!productId) return;

    const cartItems = getCartItems();
    const cartItem = cartItems.find(item => item.id === productId);

    if (action === 'delete') {
        saveCartItems(cartItems.filter(item => item.id !== productId));
    } else if (action === 'increase' && cartItem) {
        cartItem.quantity++;
        saveCartItems(cartItems);
    } else if (action === 'decrease' && cartItem) {
        if (cartItem.quantity > 1) {
            cartItem.quantity--;
            saveCartItems(cartItems);
        } else {
            saveCartItems(cartItems.filter(item => item.id !== productId));
        }
    } else {
        return;
    }

    renderCart();
});

function applyCoupon() {
    const code = orderInputField.value.trim().toUpperCase();

    if (!COUPONS[code]) {
        showCouponMessage('Enter SAVE10 or SAVE20.', 'red');
        return 0;
    }

    localStorage.setItem(COUPON_STORE, code);
    orderInputField.value = code;
    showCouponMessage(`${code} applied.`, 'green');
    renderCart();
}

applyBtn.addEventListener('click', applyCoupon);

checkoutButton.addEventListener('click', () => {
    if (!getCartItems().length) {
        alert('Your cart is empty.');
        return;
    }

    alert('Checkout successful! Thank you for your order.');
    localStorage.removeItem(CART_STORE);
    localStorage.removeItem(COUPON_STORE);
    orderInputField.value = '';
    couponMessage.hidden = true;
    renderCart();
});

const savedCoupon = getCoupon();
if (savedCoupon) {
    orderInputField.value = savedCoupon.code;
    showCouponMessage(`${savedCoupon.code} applied.`, 'green');
}

renderCart();
