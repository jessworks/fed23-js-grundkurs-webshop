// Containers for product listing and cart
const productsContainerHtml = document.querySelector('#productsContainer');
const cartContainerHtml = document.querySelector('#cartContainer');
const today = new Date(); //lyft in i funktionerna --> Jenni: vanliga fel

// Sort on name, price, and rating.
const productsSortAZBtn = document.querySelector('#productsSortAZ');
const productsSortZABtn = document.querySelector('#productsSortZA');
const productsSortPrice123Btn = document.querySelector('#productsSortPrice123');
const productsSortPrice321Btn = document.querySelector('#productsSortPrice321');
const productsSortRating123Btn = document.querySelector('#productsSortRating123');
const productsSortRating321Btn = document.querySelector('#productsSortRating321');

// Adjustments in pricing, fees, and payment options.
const isFriday = today.getDay() === 5;
const isSaturday = today.getDay() === 6;
const isSunday = today.getDay() === 0;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();
const invoiceBtn = document.querySelector('#invoiceBtn');
const cardBtn = document.querySelector('#cardRadio');

// Empty cart
const emptyCartBtn = document.querySelector('#emptyCart');
let slownessTimeout = setTimeout(emptyCartTooSlow, 1000 * 60 * 15);

// Validate for invoice, activate order button.
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="paymentOption"]'));
const invoiceRadio = document.querySelector('#invoiceRadio');
const cardRadio = document.querySelector('#cardRadio');
const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
let selectedPaymentOption = 'invoice';

const personalId = document.querySelector('#personalId');
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);

const orderBtn = document.querySelector('#orderBtn');
//const invoice = document.querySelector('#invoice'); --> ? selectedPaymentOption


const products = [
    {
        image: [
            {
                src: 'images/diliara-garifullina-ftrv8LiVZso-unsplash.jpg',
                alt: 'A slice of cherry pie on a white- and blue-coloured plate.',
            },
        ],
        name: 'Cherry Pie',
        price: 67,
        rating: 5,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/diliara-garifullina-D7X-GMeTV7U-unsplash.jpg',
                alt: 'A slice of apple pie on a white- and teal-coloured plate',
            },
        ],
        name: 'Apple Pie',
        price: 67,
        rating: 4,
        category: 'State Trooper',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/florian-zeh-OgGVvVKfWPk-unsplash.jpg',
                alt: 'A cup filled with coffee and milk against a wood grain backdrop.',
            },
        ],
        name: 'Flat White',
        price: 47,
        rating: 4,
        category: 'State Trooper',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'A white cup filled with black coffee against a light umber backdrop.',
            },
        ],
        name: 'Coffee, Black',
        price: 42,
        rating: 4,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
        {
            src: 'images/birgith-roosipuu-eCmSe8-KHOw-unsplash.jpg',
            alt: 'A half-eaten donut with cherry pink glaze and sprinkles',
        },
    ],
        name: 'Cherry Glazed Donut',
        price: 54,
        rating: 3,
        category: 'Log Lady',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/kenny-kennethh-Yc5sL-ejk6U-unsplash (1).jpg',
                alt: 'A chocolate glazed donut with rainbow sprinkles.',
            },
        ],
        name: 'Chocolate Glazed Donut',
        price: 54,
        rating: 4,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/lore-schodts-A7PwjrNLf1U-unsplash.jpg',
                alt: 'A donut with white glaze and caramel stripes.',
            },
        ],
        name: 'Caramel Drizzle Donut',
        price: 49,
        rating: 3,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/food-photographer-jennifer-pallian-OfdDiqx8Cz8-unsplash.jpg',
                alt: 'A smashed choocolate chip cookie with melted chocolate coming out of it.',
            },
        ],
        name: 'Choc Chip Cookie',
        price: 47,
        rating: 4.5,
        category: 'Log Lady',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/eaters-collective-uhJfaJ6c9fY-unsplash.jpg',
                alt: 'A rye bread sandwich filled with ham, cheese, and salad.',
            },
        ],
        name: 'Ham on Rye',
        price: 67,
        rating: 4,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/pixzolo-photography-BiWb1Y8wpZk-unsplash.jpg',
                alt: 'Grilled cheese triangles on a white plate laying on a messy table.',
            },
        ],
        name: 'Grilled Cheese',
        price: 59,
        rating: 3.5,
        category: 'State Trooper',
        amount: 0,
    }
];


function decreaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    if (products[index].amount >= 0) {
        products[index].amount = 0;
    } else {
        products[index].amount -= 1;
    }
    printProducts();
};

function increaseAmount(e) {
    const index = e.currentTarget.dataset.id;
    products[index].amount += 1;
    printProducts();
};

function getPriceMultiplier() {
    if ((isFriday && currentHour >= 15) || isSaturday || isSunday || (isMonday && currentHour > 3)) {
        return 1.15;
    } else {
        return 1;
    };
}

// Print products
function printProducts() {
    productsContainerHtml.innerHTML = '';

    let priceIncrease = getPriceMultiplier();

    products.forEach((product, index) => {
        productsContainerHtml.innerHTML += 
        `
            <li class="products">
                <img src="${product.image[0].src}" alt="${product.image[0].alt}" loading="lazy" height="300" width="300">
                <h2 class="productName">${product.name}</h2>
                <div>Price: <span>${Math.round(product.price * priceIncrease)}</span> kr</div>
                <div>Rating: <span>${product.rating}</span></div>
                <div>Category: <span>${product.category}</span></div>
                <button data-id="${index}" class="decreaseBtn">-</button>
                <button data-id="${index}" class="increaseBtn">+</button>
                <div class="amount">Amount: <span>${product.amount}</span></div>
            </li>
        `;
    });
    

    const btnDecrease = document.querySelectorAll('button.decreaseBtn');
    const btnIncrease = document.querySelectorAll('button.increaseBtn');

    btnDecrease.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });

    btnIncrease.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });
    
    printProductsCart();
};


// Print cart
function printProductsCart() {
    cartContainerHtml.innerHTML = '';

    let sum = 0;
    let productsAmountOrdered = 0;
    let msg = '';
    let priceIncrease = getPriceMultiplier();

    //Cart
    products.forEach(product => {
        productsAmountOrdered += product.amount;

        //10 or more of same product, 10 % discount
        if (product.amount > 0) {
            let productsPrice = product.price;
            if (product.amount >= 10) {
                productsPrice *= 0.9;
            };

            const adjustedProductsPrice = productsPrice * priceIncrease;

            sum += product.amount * adjustedProductsPrice;

            cartContainerHtml.innerHTML += 
            `
                <article>
                    <span>${product.name}</span>
                    <div>Amount: <span>${product.amount}</span></div>
                    <div>Total: <span>${Math.round(product.amount * adjustedProductsPrice)}</span> kr</div>
                    
                </article>
            `;
        };
    });

    if (sum <= 0) {
        return;
    }

    //Monday discount
    if (isMonday && currentHour > 3) {
        sum *= 0.9; 
        msg += `<p>Happy Monday! You get 10 % off your order.</p>`;
    };

    cartContainerHtml.innerHTML += `<div><label for="dicountCode">Enter discount code <input type="text" id="discountCode">`
    cartContainerHtml.innerHTML += `<p>Total sum: ${Math.round(sum)} kr</p>`;
    cartContainerHtml.innerHTML += `<div>${msg}</div>`;

    //15+ products, free delivery
    if (productsAmountOrdered > 15) {
        cartContainerHtml.innerHTML += '<p>Shipping: 0 kr</p>';
    } else {
        cartContainerHtml.innerHTML += `<p>Shipping: ${Math.round(25 + (0.1 * sum))}`
    };

    //* Cart over 800 kr, invoice invalid option. --> FUNKAR INTE
    if (sum > 800) {
        invoiceOption.setAttribute('hidden', '');
        invoiceBtn.setAttribute('hidden', '');
        invoiceBtn.removeAttribute('checked');
        //cardBtn.setAttribute('checked', '');
    };
};

printProducts();


// Sort products
productsSortAZBtn.addEventListener('click', sortByNameAsc);

function sortByNameAsc(e) {
    products.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {    
            return 1;
        }
        return 0;
    });

    printProducts();
};


productsSortZABtn.addEventListener('click', sortByNameDesc);

function sortByNameDesc(e) {
    products.sort((a, b) => {
        if (a.name > b.name) {
            return -1;
        }
        if (a.name < b.name) {
            return 1;
        }
        return 0;
    });

    printProducts();
};


productsSortPrice123Btn.addEventListener('click', sortByPriceAsc);

function sortByPriceAsc(e) {
    products.sort((a, b) => {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
    });

    printProducts();
};


productsSortPrice321Btn.addEventListener('click', sortByPriceDesc);

function sortByPriceDesc(e) {
    products.sort((a, b) => {
        if (a.price > b.price) {
        return -1;
    }
        if (a.price < b.price) {
        return 1;
    }
    return 0;
    });

    printProducts();
};


productsSortRating123Btn.addEventListener('click', sortByRatingAsc);

function sortByRatingAsc(e) {
    products.sort((a, b) => {
    if (a.rating < b.rating) {
        return -1;
    }
    if (a.rating > b.rating) {
        return 1;
    }
    return 0;
    });

    printProducts();
}

productsSortRating321Btn.addEventListener('click', sortByRatingDesc);

function sortByRatingDesc(e) {

    products.sort((a, b) => {
        if (a.rating > b.rating) {
            return -1;
        }
        if (a.rating < b.rating) {
            return 1;
        }
        return 0;
    });

    printProducts();
};


// Reset cart
emptyCartBtn.addEventListener('click', emptyCart);

function emptyCart() {
    cartContainerHtml.innerHTML = '';

    for (let i = 0; i < products.length; i++) {
        products[i].amount = 0;
    }
    console.table(products);
    
    printProducts();
};


function emptyCartTooSlow() {
    alert('Too late. Someone is eating your donuts.');

    emptyCart();
};


/*
____________________________________
______CUSTOMER INFO VALIDATION______
____________________________________
*/

// Switches between invoice and card as payment options. Toggles their visibility.
cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPaymentMethod);
});


function switchPaymentMethod(e) {
    if (invoiceRadio.checked) {
        invoiceOption.removeAttribute('hidden');
        cardOption.setAttribute('hidden', '');
    };

    if (cardRadio.checked) {
        cardOption.removeAttribute('hidden');
        invoiceOption.setAttribute('hidden', '');
    };
    

    /*invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');*/

    selectedPaymentOption = e.target.value;
};




// Validate personal id number and activate order button.
/*personalId.addEventListener('change', activateOrderButton);

function isPersonalIdNumberValid() {
    return personalIdRegEx.exec(personalId.value);
};

function activateOrderButton() {
    if (selectedPaymentOption === 'invoice' && isPersonalIdNumberValid()) {
        orderBtn.removeAttribute('disabled');
    } else if(selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
        orderBtn.setAttribute('disabled', '');
    }
};*/



function activateOrderBtn() { // Kan inte läsa firstName.length utan .value --> FUNKAR INTE
    const firstName = document.querySelector('#firstName').addEventListener('blur', activateOrderBtn);
    const firstNameErrorMsg = document.querySelector('#firstNameErrorMsg');

    if (firstName.length === 0) {
        firstNameErrorMsg.innerHTML = 'Fill out this field.';
        orderBtn.setAttribute('disabled', '');
        return false;
    } else {
        firstNameErrorMsg.innerHTML = '';
        orderBtn.removeAttribute('disabled');
        return true;
    };
};

activateOrderBtn();


// Order confirmation
