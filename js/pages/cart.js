const productItem = JSON.parse(localStorage.getItem("productItem"));
const cartBlock = document.querySelector(".cart-blocks");

cartBlock.innerHTML = `
    <section class="cart-block">
        <img src="./assets/images/cart1.png" alt="cart1">
            <section class="cart-block__content">
                <div class="cart-block__first">
                    <h3 class="first-head">${productItem[0]}</h3>
                    <a href=""><img class="delete-icon" src="./assets/icons/delete.svg" alt="delete-icon"></a>
                </div>
                <div class="cart-block__second">
                    <h5 class="">Size: <span>Large</span></h5>
                    <h5 class="">Color: <span>White</span></h5>
                </div>
                <div class="cart-block__third">
                    <h3>${productItem[1]}</h3>
                    <div class="product-count">
                        <img class="icon" src="./assets/icons/subtract.svg" alt="subtract-icon">
                            <h4 class="count__variable">${productItem[3]}</h4>
                            <img class="icon" src="./assets/icons/add.svg" alt="add-icon">
                            </div>
                    </div>
            </section>
    </section>
`

const deleteIcon = document.querySelector(".delete-icon");

deleteIcon.addEventListener("click", ()=>{
    localStorage.removeItem("productItem")
})