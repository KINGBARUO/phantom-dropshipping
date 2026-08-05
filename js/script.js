/* =========================================================
   PHANTOM STORE — PHASE 1
   Main JavaScript
   ========================================================= */


/* =========================================================
   1. PAGE LOADER
   ========================================================= */

const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
    setTimeout(() => {
        if (pageLoader) {
            pageLoader.classList.add("hidden");
        }
    }, 900);
});


/* =========================================================
   2. SIDEBAR
   ========================================================= */

const sidebar = document.getElementById("sidebar");
const openSidebarButton = document.getElementById("openSidebar");
const closeSidebarButton = document.getElementById("closeSidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");


function openSidebar() {
    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.add("active");
    sidebarOverlay.classList.add("active");

    document.body.classList.add("sidebar-open");
}


function closeSidebar() {
    if (!sidebar || !sidebarOverlay) return;

    sidebar.classList.remove("active");
    sidebarOverlay.classList.remove("active");

    document.body.classList.remove("sidebar-open");
}


if (openSidebarButton) {
    openSidebarButton.addEventListener("click", openSidebar);
}


if (closeSidebarButton) {
    closeSidebarButton.addEventListener("click", closeSidebar);
}


if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", closeSidebar);
}


/* Close sidebar when a menu item is clicked */

const sidebarLinks = document.querySelectorAll(".sidebar-link");

sidebarLinks.forEach((link) => {

    link.addEventListener("click", () => {

        sidebarLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

        closeSidebar();

    });

});


/* =========================================================
   3. ESCAPE KEY
   ========================================================= */

document.addEventListener("keydown", (event) => {

    if (event.key !== "Escape") return;

    closeSidebar();
    closeProductModal();
    closeCart();

});


/* =========================================================
   4. PRODUCT DATA
   ========================================================= */

const products = {

    headphones: {
        title: "Phantom Wireless Pro",
        category: "AUDIO",
        price: 45000,
        color: "#4e8cff",
        description:
            "Premium wireless headphones designed for immersive sound, everyday comfort and a clean modern look."
    },

    watch: {
        title: "Aurex Smart Watch",
        category: "ACCESSORIES",
        price: 68500,
        color: "#d6a84f",
        description:
            "A premium smart watch combining everyday convenience, modern design and smart features."
    },

    speaker: {
        title: "Echo Mini Speaker",
        category: "TECH",
        price: 32000,
        color: "#35d39a",
        description:
            "A compact wireless speaker designed to deliver powerful sound without taking over your space."
    },

    sneakers: {
        title: "Phantom Street Runner",
        category: "FASHION",
        price: 57000,
        color: "#a76cff",
        description:
            "A modern streetwear sneaker built around comfort, personality and a bold everyday silhouette."
    }

};


/* =========================================================
   5. PRODUCT MODAL
   ========================================================= */

const productModal = document.getElementById("productModal");
const modalBackdrop = document.getElementById("modalBackdrop");
const modalClose = document.getElementById("modalClose");

const modalProductImage =
    document.getElementById("modalProductImage");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const modalPrice =
    document.getElementById("modalPrice");

const modalAddCart =
    document.getElementById("modalAddCart");


let selectedProduct = null;


function formatPrice(price) {

    return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
        maximumFractionDigits: 0
    }).format(price);

}


function openProductModal(productId) {

    const product = products[productId];

    if (!product || !productModal) return;

    selectedProduct = productId;

    modalCategory.textContent = product.category;

    modalTitle.textContent = product.title;

    modalDescription.textContent = product.description;

    modalPrice.textContent = formatPrice(product.price);

    modalProductImage.textContent = product.category;

    modalProductImage.style.background = `
        radial-gradient(
            circle,
            ${product.color}55,
            transparent 60%
        ),
        #0b1830
    `;

    productModal.classList.add("active");

    document.body.classList.add("modal-open");

}


function closeProductModal() {

    if (!productModal) return;

    productModal.classList.remove("active");

    document.body.classList.remove("modal-open");

    selectedProduct = null;

}


if (modalClose) {
    modalClose.addEventListener(
        "click",
        closeProductModal
    );
}


if (modalBackdrop) {
    modalBackdrop.addEventListener(
        "click",
        closeProductModal
    );
}


/* =========================================================
   6. PRODUCT CARDS
   ========================================================= */

const productCards =
    document.querySelectorAll(".product-card");


productCards.forEach((card) => {

    card.addEventListener("click", (event) => {

        /*
         * Don't open the product modal when
         * the heart or add button itself was clicked.
         */

        if (
            event.target.closest(".heart-button") ||
            event.target.closest(".add-button")
        ) {
            return;
        }

        const productId =
            card.dataset.product;

        openProductModal(productId);

    });

});


/* =========================================================
   7. CART
   ========================================================= */

const cartButton =
    document.getElementById("cartButton");

const closeCartButton =
    document.getElementById("closeCart");

const miniCart =
    document.getElementById("miniCart");

const cartOverlay =
    document.getElementById("cartOverlay");

const cartCount =
    document.getElementById("cartCount");

const cartItems =
    document.getElementById("cartItems");

const cartTotal =
    document.getElementById("cartTotal");


let cart = [];


/* =========================================================
   8. OPEN CART
   ========================================================= */

function openCart() {

    if (!miniCart || !cartOverlay) return;

    miniCart.classList.add("active");

    cartOverlay.classList.add("active");

    document.body.classList.add("cart-open");

}


/* =========================================================
   9. CLOSE CART
   ========================================================= */

function closeCart() {

    if (!miniCart || !cartOverlay) return;

    miniCart.classList.remove("active");

    cartOverlay.classList.remove("active");

    document.body.classList.remove("cart-open");

}


if (cartButton) {
    cartButton.addEventListener(
        "click",
        openCart
    );
}


if (closeCartButton) {
    closeCartButton.addEventListener(
        "click",
        closeCart
    );
}


if (cartOverlay) {
    cartOverlay.addEventListener(
        "click",
        closeCart
    );
}


/* =========================================================
   10. ADD PRODUCT TO CART
   ========================================================= */

function addToCart(productId) {

    const product = products[productId];

    if (!product) return;


    const existingItem =
        cart.find(
            (item) => item.id === productId
        );


    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            id: productId,
            quantity: 1
        });

    }


    updateCart();

    openCart();

}


/* =========================================================
   11. UPDATE CART
   ========================================================= */

function updateCart() {

    if (!cartItems) return;


    let totalItems = 0;

    let totalPrice = 0;


    cart.forEach((item) => {

        const product =
            products[item.id];

        totalItems += item.quantity;

        totalPrice +=
            product.price * item.quantity;

    });


    if (cartCount) {
        cartCount.textContent =
            totalItems;
    }


    if (cartTotal) {
        cartTotal.textContent =
            formatPrice(totalPrice);
    }


    /* Empty cart */

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">

                <div>🛒</div>

                <p>Your cart is empty.</p>

                <span>
                    Add something you love.
                </span>

            </div>
        `;

        return;

    }


    /* Cart items */

    cartItems.innerHTML = cart.map((item) => {

        const product =
            products[item.id];


        return `
            <div
                class="cart-item"
                data-cart-id="${item.id}"
            >

                <div
                    class="cart-item-image"
                    style="
                        background:
                        radial-gradient(
                            circle,
                            ${product.color}55,
                            transparent 65%
                        ),
                        #10203d;
                    "
                >
                    ${product.category}
                </div>

                <div class="cart-item-details">

                    <span>
                        ${product.category}
                    </span>

                    <h4>
                        ${product.title}
                    </h4>

                    <strong>
                        ${formatPrice(product.price)}
                    </strong>

                    <div class="cart-quantity">

                        <button
                            class="quantity-button"
                            data-action="decrease"
                            data-id="${item.id}"
                        >
                            −
                        </button>

                        <span>
                            ${item.quantity}
                        </span>

                        <button
                            class="quantity-button"
                            data-action="increase"
                            data-id="${item.id}"
                        >
                            +
                        </button>

                    </div>

                </div>

                <button
                    class="remove-cart-item"
                    data-action="remove"
                    data-id="${item.id}"
                    aria-label="Remove item"
                >
                    ×
                </button>

            </div>
        `;

    }).join("");


}


/* =========================================================
   12. CART QUANTITY CONTROLS
   ========================================================= */

if (cartItems) {

    cartItems.addEventListener(
        "click",
        (event) => {

            const button =
                event.target.closest(
                    "[data-action]"
                );

            if (!button) return;


            const action =
                button.dataset.action;

            const productId =
                button.dataset.id;


            const item =
                cart.find(
                    (cartItem) =>
                        cartItem.id === productId
                );


            if (action === "increase") {

                if (item) {
                    item.quantity += 1;
                }

            }


            if (action === "decrease") {

                if (item) {

                    item.quantity -= 1;

                    if (item.quantity <= 0) {

                        cart =
                            cart.filter(
                                (cartItem) =>
                                    cartItem.id !==
                                    productId
                            );

                    }

                }

            }


            if (action === "remove") {

                cart =
                    cart.filter(
                        (cartItem) =>
                            cartItem.id !== productId
                    );

            }


            updateCart();

        }
    );

}


/* =========================================================
   13. ADD BUTTONS
   ========================================================= */

const addButtons =
    document.querySelectorAll(".add-button");


addButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            const card =
                button.closest(".product-card");


            if (!card) return;


            const productId =
                card.dataset.product;


            addToCart(productId);

        }
    );

});


/* =========================================================
   14. MODAL ADD TO CART
   ========================================================= */

if (modalAddCart) {

    modalAddCart.addEventListener(
        "click",
        () => {

            if (!selectedProduct) return;

            addToCart(selectedProduct);

            closeProductModal();

        }
    );

}


/* =========================================================
   15. WISHLIST
   ========================================================= */

const heartButtons =
    document.querySelectorAll(".heart-button");


let wishlist = [];


heartButtons.forEach((button) => {

    button.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();


            const card =
                button.closest(".product-card");


            if (!card) return;


            const productId =
                card.dataset.product;


            if (
                wishlist.includes(productId)
            ) {

                wishlist =
                    wishlist.filter(
                        (id) =>
                            id !== productId
                    );

                button.classList.remove(
                    "liked"
                );

                button.textContent = "♡";

            } else {

                wishlist.push(productId);

                button.classList.add(
                    "liked"
                );

                button.textContent = "♥";

            }

        }
    );

});


/* =========================================================
   16. WISHLIST HEADER BUTTON
   ========================================================= */

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


if (wishlistButton) {

    wishlistButton.addEventListener(
        "click",
        () => {

            if (wishlist.length === 0) {

                alert(
                    "Your wishlist is empty."
                );

                return;

            }


            alert(
                `You have ${wishlist.length} item(s) in your wishlist.`
            );

        }
    );

}


/* =========================================================
   17. CATEGORY CARDS
   ========================================================= */

const categoryCards =
    document.querySelectorAll(
        ".category-card"
    );


categoryCards.forEach((card) => {

    card.addEventListener(
        "click",
        () => {

            const shop =
                document.getElementById("shop");


            if (shop) {

                shop.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }
    );

});


/* =========================================================
   18. SEARCH BUTTON
   ========================================================= */

const searchButton =
    document.getElementById(
        "searchButton"
    );


if (searchButton) {

    searchButton.addEventListener(
        "click",
        () => {

            const search =
                prompt(
                    "What are you looking for?"
                );


            if (
                search &&
                search.trim() !== ""
            ) {

                alert(
                    `Search system ready for: ${search}`
                );

            }

        }
    );

}


/* =========================================================
   19. ACCOUNT BUTTON
   ========================================================= */

const accountButton =
    document.getElementById(
        "accountButton"
    );


if (accountButton) {

    accountButton.addEventListener(
        "click",
        () => {

            alert(
                "Account system will be connected in a later phase."
            );

        }
    );

}


/* =========================================================
   20. ACTIVE NAVIGATION
   ========================================================= */

const navLinks =
    document.querySelectorAll(
        ".nav-link"
    );


navLinks.forEach((link) => {

    link.addEventListener(
        "click",
        () => {

            navLinks.forEach(
                (navItem) => {
                    navItem.classList.remove(
                        "active"
                    );
                }
            );


            link.classList.add("active");

        }
    );

});


/* =========================================================
   21. SIMPLE SCROLL REVEAL
   ========================================================= */

const revealElements =
    document.querySelectorAll(
        ".category-card, .product-card, .deal-section, .shop-placeholder"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(
                    (entry) => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        (element) => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 700ms ease, transform 700ms cubic-bezier(0.22, 1, 0.36, 1)";

            revealObserver.observe(
                element
            );

        }
    );

}


/* =========================================================
   22. INITIAL CART STATE
   ========================================================= */

updateCart();


/* =========================================================
   23. CONSOLE MESSAGE
   ========================================================= */

console.log(
    "%cPHANTOM STORE",
    "font-size:20px;font-weight:bold;"
);

console.log(
    "Phase 1 storefront systems initialized."
);
