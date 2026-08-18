const navbarCount = document.querySelector(".navbar__cart-count");

function updateNavbarCount() {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    navbarCount.textContent = cartItems.length;
}

updateNavbarCount();