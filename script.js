const productsContainerHtml = document.querySelector('#productsContainer');
const cartContainerHtml = document.querySelector('#cartContainer');
const today = new Date(); //lyft in i funktionerna --> Jenni: vanliga fel

const isFriday = today.getDay() === 5;
const isSaturday = today.getDay() === 6;
const isSunday = today.getDay() === 0;
const isMonday = today.getDay() === 1;
const currentHour = today.getHours();

let slownessTimeout = setTimeout(resetOrderForm, 1000 * 60 * 15);

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
        category: 'special agent',
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
        category: 'state trooper',
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
        category: 'state trooper',
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
        category: 'special agent',
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
        category: 'log lady',
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
        category: 'special agent',
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
        category: 'special agent',
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
        category: 'log lady',
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
        category: 'special agent',
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
        category: 'state trooper',
        amount: 0,
    }
];

function resetOrderForm() {
    alert('Too slow. Someone else is eating your donuts.')
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

/*Sort. En för varje sort funktion och kopplas till click evt. Vill göra den generella men vet fattar inte hur '?' delen tolkas.
Den funkar där den står nu, men vart bor eventlistener och hur får jag listan att printas igen? 
"click på filterknapp -> sotera på det sättet -> printa den i den sorterade ordningen"*/
const sortNameAbc = products.sort((a, b) => {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
});

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
    products.forEach(products => {
        productsAmountOrdered += products.amount;

        //10 or more of same product, 10 % discount
        if (products.amount > 0) {
            let productsPrice = products.price;
            if (products.amount >= 10) { //varför börjar den på 11
                products.price *= 0.9; //exponentiell rabatt för varje klick på + knapp, hur stoppa detta
            };

            const adjustedProductsPrice = productsPrice * priceIncrease;

            sum += products.amount * adjustedProductsPrice;

            cartContainerHtml.innerHTML += 
            `
                <article>
                    <span>${products.name}</span>
                    <div>Amount: <span>${products.amount}</span></div>
                    <div>Total: <span>${Math.round(products.amount * adjustedProductsPrice)}</span> kr</div>
                    
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

const cardInvoiceRadios = Array.from(document.querySelectorAll('input[name="paymentOption"]'));

cardInvoiceRadios.forEach(radioBtn => {
    radioBtn.addEventListener('change', switchPaymentMethod);
});

const invoiceOption = document.querySelector('#invoice');
const cardOption = document.querySelector('#card');
let selectedPaymentOption = 'invoice';


/*
* Switches between invoice and card as payment options. Toggles their visibility.
*/
function switchPaymentMethod(e) {
    invoiceOption.classList.toggle('hidden');
    cardOption.classList.toggle('hidden');

    selectedPaymentOption = e.target.value; 
};

const personalId = document.querySelector('#personalId');
personalId.addEventListener('change', activateOrderButton);

const personalIdRegEx = new RegExp(/^(\d{10}|\d{12}|\d{6}-\d{4}|\d{8}-\d{4}|\d{8}|\d{4}|\d{6}\d{4})/);

function isPersonalIdNumberValid() {
    return personalIdRegEx.exec(personalId.value);
};

function activateOrderButton() { //RegEx of death... Något är fel och jag ser inte vad
    if (selectedPaymentOption === 'invoice' && isPersonalIdNumberValid()) {
        console.log('aktivera');
    } else if(selectedPaymentOption === 'invoice' && !isPersonalIdNumberValid()) {
        console.log('inaktivera');
    }
};