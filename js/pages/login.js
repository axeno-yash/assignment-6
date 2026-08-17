const isProtectedPage = window.location.pathname.includes('product.html') || window.location.pathname.includes('cart.html');
const CORRECT_EMAIL = 'admin@example.com';
const CORRECT_PASSWORD = 'Admin@123';

if (isProtectedPage && !localStorage.getItem('shopAuth')) {
    window.location.href = './login.html';
}

const loginForm = document.querySelector(".login__form");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".login__error");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const email = emailInput.value;
        const password = passwordInput.value;
        
        if (!emailInput.validity.valid) {
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.color = "red";
            errorMessage.hidden = false;
            emailInput.focus();
            return;
        }
        
        if (email !== CORRECT_EMAIL || password !== CORRECT_PASSWORD) {
            errorMessage.textContent = "Incorrect email or password.";
            errorMessage.style.color = "red";
            errorMessage.hidden = false;
            return;
        }

        localStorage.setItem("shopAuth", JSON.stringify({
            isAuthenticated: true,
            email,
            loggedInAt: new Date().toISOString()
        }));

        window.location.href = "index.html";
    });
}


const logoutBtn = document.querySelector('#logoutBtn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();

        if (localStorage.getItem('shopAuth')) {
            localStorage.removeItem('shopAuth');

            if (isProtectedPage) {
                window.location.href = './login.html';
            }
        } else {
            window.location.href = './login.html';
        }
    });
}
