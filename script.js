const productsContainerHtml = document.querySelector('#productsContainer');
const cartContainerHtml = document.querySelector('#cartContainer');
const today = new Date(); //lyft in i funktionerna --> Jenni: vanliga fel

//Sort on name, price, and rating.
const productsSortAZBtn = document.querySelector('#productsSortAZ');
const productsSortZABtn = document.querySelector('#productsSortZA');
const productsSortPrice123Btn = document.querySelector('#productsSortPrice123');
const productsSortPrice321Btn = document.querySelector('#productsSortPrice321');
const productsSortRating123Btn = document.querySelector('#productsSortRating123');
const productsSortRating321Btn = document.querySelector('#productsSortRating321');

//Filter on category
const categoryOptions = Array.from(document.querySelectorAll('option[name="categoryOption"]'));
const logLadyOption= document.querySelector('#logLady');
const specialAgentOption = document.querySelector('#specialAgent');
const stateTrooperOption = document.querySelector('#stateTrooper');

//Adjustments in pricing, fees, and payment options.
const isFriday = today.getDay() === 5;
const isSaturday = today.getDay() === 6;
const isSunday = today.getDay() === 0;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();
const invoiceBtn = document.querySelector('#invoiceBtn');
const cardBtn = document.querySelector('#cardBtn');

//Reset all input
let slownessTimeout = setTimeout(resetOrderForm, 1000 * 60 * 15);

//Validate for invoice, activate order button.
const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="paymentOption"]'));
const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
let selectedPaymentOption = 'invoice';

const personalId = document.querySelector('#personalId');
const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8} \d{4}|\d{6} \d{4})/);

const orderBtn = document.querySelector('#orderBtn');
const invoice = document.querySelector('#invoice');


const products = [
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
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
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
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
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
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
                alt: 'placeholder',
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
            src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
            alt: 'placeholder',
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
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
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
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Donut, plain',
        price: 49,
        rating: 3,
        category: 'Special Agent',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Truffle Chip Cookie',
        price: 47,
        rating: 4.5,
        category: 'Log Lady',
        amount: 0,
    },
    {
        image: [
            {
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
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
                src: 'images/nathan-dumlao-nBJHO6wmRWw-unsplash.jpg',
                alt: 'placeholder',
            },
        ],
        name: 'Grilled Cheese',
        price: 59,
        rating: 3.5,
        category: 'State Trooper',
        amount: 0,
    }
];

function resetOrderForm() {
    alert('Too slow. Someone is eating your donuts.')
    //reset hela sidan, anropa funktionen för detta (används för rensa-knapp också)
    //reset() för input, products[index].amount = 0 för added products
};

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

//Sort asc/desc.
/*
const sortNameAZ = products.sort((a, b) => {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
});

const sortNameZA = products.sort((a, b) => {
    if (a.name > b.name) {
        return -1;
    }
    if (a.name < b.name) {
        return 1;
    }
    return 0;
});

const sortPrice123 = products.sort((a, b) => {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
});

const sortPrice321 = products.sort((a, b) => {
    if (a.price > b.price) {
        return -1;
    }
    if (a.price < b.price) {
        return 1;
    }
    return 0;
});

const sortRating123 = products.sort((a, b) => {
    if (a.rating < b.rating) {
        return -1;
    }
    if (a.rating > b.rating) {
        return 1;
    }
    return 0;
});

const sortRating321 = products.sort((a, b) => {
    if (a.rating > b.rating) {
        return -1;
    }
    if (a.rating < b.rating) {
        return 1;
    }
    return 0;
});

//filter by category
categoryOptions.forEach(category => {
    category.addEventListener('change', filterCategories);
});

 function filterCategories(e) {
    logLadyOption.classList.toggle('hidden');
    specialAgentOption.classList.toggle('hidden');
    stateTrooperOption.classList.toggle('hidden');

    selectedCategoryOption = e.target.value;
 }; */


//Print products
function printProducts() {
    productsContainerHtml.innerHTML = '';

    let priceIncrease = getPriceMultiplier();

    products.forEach((products, index) => {
        productsContainerHtml.innerHTML += 
        `
            <li>
                <img>${products.image}
                <h2>${products.name}</h2>
                <div>Price: <span>${Math.round(products.price * priceIncrease)}</span> kr</div>
                <div>Rating: <span>${products.rating}</span></div>
                <div>Category: <span>${products.category}</span></div>
                <button class="decrease" data-id="${index}">-</button>
                <button class="increase" data-id="${index}">+</button>
                <div>Amount: <span>${products.amount}</span></div>
            </li>
        `;
    });

    const btnDecrease = document.querySelectorAll('button.decrease');
    const btnIncrease = document.querySelectorAll('button.increase');

    btnDecrease.forEach(btn => {
        btn.addEventListener('click', decreaseAmount);
    });

    btnIncrease.forEach(btn => {
        btn.addEventListener('click', increaseAmount);
    });

    printProductsCart();
};


//Print cart
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
            };

            const adjustedProductsPrice = productsPrice * priceIncrease;

            sum += product.amount * adjustedProductsPrice;

            //Cart over 800 kr, invoice invalid option. Card btn syns och måste väljas för att inputfälten ska synas, men det får vara så just nu.
            if (sum > 800) {
                invoice.setAttribute('hidden', '');
                invoiceBtn.setAttribute('hidden', '');
                invoiceBtn.removeAttribute('checked');
                //cardBtn.setAttribute('checked', '');
            }

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
};

printProducts();

/*
____________________________________
______CUSTOMER INFO VALIDATION______
____________________________________
*/

//Switches between invoice and card as payment options. Toggles their visibility.
cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPaymentMethod);
});

function switchPaymentMethod(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');

    selectedPaymentOption = e.target.value; 
};


//Validate personal id number and activate order button.
personalId.addEventListener('change', activateOrderButton);

function isPersonalIdNumberValid() {
    return personalIdRegEx.exec(personalId.value);
};

function activateOrderButton() {
    if (selectedPaymentOption === 'invoice' && isPersonalIdNumberValid()) {
        orderBtn.removeAttribute('disabled');
    } else if(selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
        orderBtn.setAttribute('disabled', '');
    }
};